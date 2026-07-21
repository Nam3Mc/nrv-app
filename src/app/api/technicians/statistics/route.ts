import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { serverEnv } from "@/core/config/server-env";
import { API_ROUTES } from "@/core/constants/api-routes";
import { routeErrorResponse } from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";

export async function GET() {
    try {
        const cookieStore = await cookies();

        const userId = cookieStore.get( serverEnv.auth.userIdCookieName,)?.value;

        if (!userId) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: 401,
                },
            );
        }

        const statistics = await serverApiClient(
            API_ROUTES.users.statistics(userId)
        )
        console.log(NextResponse.json(statistics))
        return NextResponse.json(statistics);
    } catch (error) {
        return routeErrorResponse(error);
    }
}