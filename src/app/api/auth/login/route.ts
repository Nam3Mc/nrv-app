import { serverEnv } from "@/core/config/server-env";
import { API_ROUTES } from "@/core/constants/api-routes";
import { getDashboardRouteByRole } from "@/core/constants/app-routes";
import { AUTH_COOKIE_MAX_AGE_SECONDS, AUTH_COOKIE_PATH } from "@/core/constants/auth.constants";
import { serverApiClient } from "@/core/lib/server-api-client";
import { BackendLoginResponse, LoginRouteResponse } from "@/core/types/auth.types";
import { ApiError } from "@/core/types/api.types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import z from "zod";

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

export async function POST(request:Request) {
    if (!request) {
        console.log('no request')
    }
    console.log('received request')
    try {
        const body = await request.json()
        const loginData = loginSchema.parse(body)

        const backendResponse = await serverApiClient<BackendLoginResponse>(
            API_ROUTES.auth.login,
            {
                method: 'POST',
                auth: false,
                body: loginData,
            },
        )
        
        const cookieStore = await cookies()
        
        cookieStore.set(
            serverEnv.auth.tokenCookieName,
            backendResponse.accessToken,
            {
                httpOnly: true,
                secure: serverEnv.app.isProduction,
                sameSite: 'lax',
                maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
                path: AUTH_COOKIE_PATH
            },
        )
            
        cookieStore.set(
            serverEnv.auth.roleCookieName,
            backendResponse.user.role,
            {
                httpOnly: true,
                secure: serverEnv.app.isProduction,
                sameSite: "lax",
                maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
                path: AUTH_COOKIE_PATH,
            },
        );

        const responseBody: LoginRouteResponse = {
            success: true,
            redirectTo: getDashboardRouteByRole(backendResponse.user.role),
            user: backendResponse.user,
        }

        return NextResponse.json(responseBody, {
            status: 200,
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid login data',
                    error: error.flatten().fieldErrors,
                },
                {
                    status: 400,
                }
            )
        }

        if ( error instanceof ApiError) {
            return NextResponse.json(
                {
                    success:false,
                    message: error.message,
                },
                {
                    status: error.statusCode
                }
            )
        }

        return NextResponse.json(
            {
                success: false,
                message: 'Unespected Login error'
            },
            {
                status: 500,
            }
        )
    }
}