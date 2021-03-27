import { getRouterData } from 'wix-window'
import { to } from 'wix-location'
import wixUsers from 'wix-users'


$w.onReady(async function () {
    if (!wixUsers.currentUser.loggedIn) {
        console.log(getRouterData())

        const { sessionToken } = getRouterData()

        if (sessionToken) await wixUsers.applySessionToken(sessionToken)
    }

    to("/home");
});