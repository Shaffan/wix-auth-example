import wixLocation from 'wix-location'

const client_id = "<YOUR CLIENT ID HERE>";

$w.onReady(async function () {

    $w('#button1').onClick(() => {
        // redirect the user to github
        return wixLocation.to(`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user:email`)
    })

});