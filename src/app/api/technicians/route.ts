import { NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import {
    readJsonRequestBody,
    routeErrorResponse,
} from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";
import type {
    CreateTechnicianRequest,
    Technician,
} from "@/features/technicians/types/technician.types";

function buildTechniciansBackendPath(request: Request) {
    const url = new URL(request.url);

    if (!url.searchParams.has("role")) {
        url.searchParams.set("role", "TECHNICIAN");
    }

    const search = url.searchParams.toString();

    return `${API_ROUTES.users.base}?${search}`;
}

export async function GET(request: Request) {
    try {
        const technicians = await serverApiClient<Technician[]>(
            buildTechniciansBackendPath(request),
            {
                method: "GET",
            },
        );

        return NextResponse.json(technicians);
    } catch (error) {
        return routeErrorResponse(error);
    }
}

export async function POST(request: Request) {
    try {
        const body = (await readJsonRequestBody(
            request,
        )) as CreateTechnicianRequest;

        const payload: CreateTechnicianRequest = {
            ...body,
            role: "TECHNICIAN",
        };

        const createdTechnician = await serverApiClient<Technician>(
            API_ROUTES.users.base,
            {
                method: "POST",
                body: payload,
            },
        );

        return NextResponse.json(createdTechnician, {
            status: 201,
        });
    } catch (error) {
        return routeErrorResponse(error);
    }
}