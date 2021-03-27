import wixLocation from 'wix-location'
import wixUsers from 'wix-users'

import { githubLogin } from 'backend/auth'

const client_id = '<YOUR CLIENT ID HERE>'

$w.onReady(async function () {
    if (!wixUsers.currentUser.loggedIn) {

        // retrieve the code from the url
        const { code } = wixLocation.query

        // if they don't have a code, send them off to get one
		if (!code) return wixLocation.to(`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user:email`)

        try {
            const { sessionToken } = await githubLogin(code)

            // log them in
            if (sessionToken) {
                await wixUsers.applySessionToken(sessionToken)
            }
        } catch (e) {
            console.log(e)
        }
    }

    wixLocation.to("/home");
});