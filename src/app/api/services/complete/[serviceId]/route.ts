import { NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import { routeErrorResponse } from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";
import { TechnicianService } from "@/features/technicians/types/technician-service.types";


interface RouteParams {
    params: Promise<{
        serviceId: string;
    }>;
}

export async function PATCH(
    request: Request,
    { params }: RouteParams,
) {
    try {
        const { serviceId } = await params;
        const body = await request.json();

        const service = await serverApiClient<TechnicianService>(
            API_ROUTES.services.complete(serviceId),
            {
                method: "PATCH",
                body,
            },
        );

        return NextResponse.json(service);
    } catch (error) {
        return routeErrorResponse(error);
    }
}