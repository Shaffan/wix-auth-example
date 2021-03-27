import wixUsersBackend from 'wix-users-backend';
import { getAccessToken, getEmailAddress } from 'backend/github';

// despite its appearance, this function returns a promise
export async function isAuth() {
    return wixUsersBackend.currentUser.loggedIn
}

export async function githubLogin(code) {
    if (await isAuth()) return { approved: true }
    if (!code) throw new Error("missing required 'code' parameter")

    const { accessToken, grantedEmail } = await getAccessToken(code)

    if (!grantedEmail) throw new Error('Cannot authenticate without user email address')

    const email = await getEmailAddress(accessToken)
    const sessionToken = await wixUsersBackend.generateSessionToken(email)

    return { approved: true, sessionToken }
}