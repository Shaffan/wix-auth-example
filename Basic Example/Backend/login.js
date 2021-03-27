import { getSessionTokenFromCode, isAuth } from 'backend/auth'

export async function login(code) {
    if (await isAuth()) return { approved: true }
    if (!code) throw new Error("missing required 'code' parameter")

    const { sessionToken } = await getSessionTokenFromCode(code)
    return { approved: true, sessionToken }
}