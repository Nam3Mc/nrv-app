import { NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import { routeErrorResponse } from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";

export async function GET() {
    try {
        const services = await serverApiClient(
            API_ROUTES.services.myServices,
        );
        console.log(NextResponse.json(services))

        return NextResponse.json(services);
    } catch (error) {
        return routeErrorResponse(error);
    }
}