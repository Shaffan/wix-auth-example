import { ok, notFound, redirect } from "wix-router";
import { githubLogin, isAuth } from 'backend/auth'

export async function auth_Router(request) {
    if (await isAuth()) return redirect('/home')

    if (!request.query || !request.query.code) return redirect('/home') // you could redirect them to pick up a code too

    try {
        const code = request.query.code
        const { sessionToken } = await githubLogin(code)

        return ok('auth-page', { sessionToken })
    } catch (e) {
        console.error(e)

        return ok('auth-page', { error: e.toString() })
    }
}

export function SiteMap_Router(request) {
    return notFound()
}