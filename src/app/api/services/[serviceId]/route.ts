import { NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import {
    readJsonRequestBody,
    routeErrorResponse,
} from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";
import type { Service } from "@/features/services/types/service.types";

interface RouteParams {
    params: Promise<{
        serviceId: string;
    }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
    try {
        const { serviceId } = await params;
        const body = await readJsonRequestBody(request);

        const updatedService = await serverApiClient<Service>(
            API_ROUTES.services.getById(serviceId),
            {
                method: "PATCH",
                body,
            },
        );

        return NextResponse.json(updatedService);
    } catch (error) {
        return routeErrorResponse(error);
    }
}