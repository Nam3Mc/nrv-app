import { NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import {
    buildPathWithSearchParams,
    readJsonRequestBody,
    routeErrorResponse,
} from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";
import type {
    CreateServiceRequest,
    Service,
} from "@/features/services/types/service.types";

export async function GET(request: Request) {
    try {
        const backendPath = buildPathWithSearchParams(
            API_ROUTES.services.base,
            request,
        );

        const services = await serverApiClient<Service[]>(backendPath, {
            method: "GET",
        });

        return NextResponse.json(services);
    } catch (error) {
        return routeErrorResponse(error);
    }
}

export async function POST(request: Request) {
    try {
        const body = await readJsonRequestBody(request);

        const createdService = await serverApiClient<Service>(
            API_ROUTES.services.base,
            {
                method: "POST",
                body: body as CreateServiceRequest,
            },
        );

        return NextResponse.json(createdService, {
            status: 201,
        });
    } catch (error) {
        return routeErrorResponse(error);
    }
}