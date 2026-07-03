import { serverEnv } from "@/core/config/server-env";
import { AUTH_COOKIE_PATH } from "@/core/constants/auth.constants";
import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json(
        {
            success: true,
        },
        {
            status: 200
        }
    )

    response.cookies.set(serverEnv.auth.tokenCookieName, '', {
        httpOnly: true,
        secure:serverEnv.app.isProduction,
        sameSite: 'lax',
        maxAge: 0,
        path: AUTH_COOKIE_PATH,
    })

    response.cookies.set(serverEnv.auth.roleCookieName, '',{
        httpOnly: true,
        secure: serverEnv.app.isProduction,
        sameSite: 'lax',
        maxAge: 0,
        path: AUTH_COOKIE_PATH,
    })

    return response
}