import { NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import {
    readJsonRequestBody,
    routeErrorResponse,
} from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";
import type { Technician } from "@/features/technicians/types/technician.types";

interface RouteParams {
    params: Promise<{
        technicianId: string;
    }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
    try {
        const { technicianId } = await params;
        const body = await readJsonRequestBody(request);

        const updatedTechnician = await serverApiClient<Technician>(
            API_ROUTES.users.getById(technicianId),
            {
                method: "PATCH",
                body,
            },
        );

        return NextResponse.json(updatedTechnician);
    } catch (error) {
        return routeErrorResponse(error);
    }
}