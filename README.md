Some examples of how to add custom, third-party authentication to your Wix website with the Velo JavaScript IDE.

# Basic example

As the heading suggests, this is the simplest way to do add a third-party integration; it involves importing backend code into your frontend code, which is perhaps not the most secure way to do this.

It can be improved in a number of ways, including by the use of the [Wix Secrets Manager](https://www.wix.com/velo/reference/wix-secrets-backend) to store the Client ID and Client Secret.


# Wix Router example

This is the suggested way to add third-party authenetication to your website, but Unfortunately, at the time of writing there is a bug that is preventing it from working. See my [forum post](https://www.wix.com/velo/forum/community-discussion/bug-why-is-my-frontend-code-being-executed-from-another-unknown-machine-based-in-another-country) about it.

It's a shame because this is a much more secure method for adding this kind of integration. This is because everything is handled in the backend, and at no point do you have to import backend code into your frontend code. I would highly recommend trying this method before resorting to the basic one.

It uses the Wix Router API module ([docs](https://www.wix.com/velo/reference/wix-router)) to accept requests, retrieve the access token, and forward the user to the login page with a Wix session token that can be used to log them in.

# Misc docs

Flows and APIs used:

https://docs.github.com/en/developers/apps/authorizing-oauth-apps#web-application-flow
https://docs.github.com/en/rest/reference/users#list-email-addresses-for-the-authenticated-user
https://www.wix.com/velo/reference/wix-users-backend/generatesessiontoken
https://www.wix.com/velo/reference/wix-users/applysessiontoken
