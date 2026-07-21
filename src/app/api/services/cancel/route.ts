import { NextResponse } from "next/server";
import { API_ROUTES } from "@/core/constants/api-routes";
import {
    routeErrorResponse,
} from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";
import type { Service } from "@/features/services/types/service.types";

interface RouteParams { 
    params: Promise<{serviceId: string}>
}

export async function PATCH(request: Request, { params }: RouteParams) {
    try {
        const { serviceId } = await params;
        const caceledService = await serverApiClient<Service>(
            API_ROUTES.services.cancel(serviceId),
            {
                method: "PATCH",
            },
        );

        return NextResponse.json(caceledService);
    } catch (error) {
        return routeErrorResponse(error);
    }
}