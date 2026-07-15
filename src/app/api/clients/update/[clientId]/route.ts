import { NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import {
    routeErrorResponse,
} from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";
import type { Client } from "@/features/clients/types/client.types";

interface RouteParams {
    params: Promise<{
        clientId: string;
    }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {

    try {
        const { clientId } = await params;
        const body = await request.json()
        const updatedClient = await serverApiClient<Client>(
            API_ROUTES.clients.update(clientId),
            {
                method: 'PATCH',
                body,
            }
        )
        return NextResponse.json(updatedClient);
    } catch (error) {
        return routeErrorResponse(error);
    }
}