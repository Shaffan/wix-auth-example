import axios from 'axios'

const client_id = "<YOUR CLIENT ID HERE>";
const client_secret = "<YOUR CLIENT SECRET HERE>";

export async function getAccessToken(code) {
    const response = await axios.post(`https://github.com/login/oauth/access_token`, {
        client_id,
        client_secret,
        code
    });

    if (!response.status === 200 || response.data.includes('error'))
        throw new Error(`GitHub response indicated failure: ${response.data}`)

    const params = parseParams(response.data)

    return {
        accessToken: params.access_token,
        grantedEmail: params.scope.indexOf('user%3Aemail') > -1
    }
}

export async function getEmailAddress(accessToken) {
    const response = await axios.get(`https://api.github.com/user/emails`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (!response.status === 200 || response.data.includes('error'))
        throw new Error(`GitHub response indicated failure: ${response.data}`)

    const primary = response.data.filter(email => email.primary)[0]

    return primary.email
}

// abc=123&abd=321 -> { abc: 123, abd: 321 }
function parseParams(data) {
    return JSON.parse('{"' + decodeURI(data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}