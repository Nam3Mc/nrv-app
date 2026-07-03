import { NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import {
    buildPathWithSearchParams,
    readJsonRequestBody,
    routeErrorResponse,
} from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";
import type {
    Client,
    CreateClientRequest,
} from "@/features/clients/types/client.types";

export async function GET(request: Request) {
    try {
        const backendPath = buildPathWithSearchParams(
            API_ROUTES.clients.base,
            request,
        );

        const clients = await serverApiClient<Client[]>(backendPath, {
            method: "GET",
        });

        return NextResponse.json(clients);
    } catch (error) {
        return routeErrorResponse(error);
    }
}

export async function POST(request: Request) {
    try {
        const body = await readJsonRequestBody(request);

        const createdClient = await serverApiClient<Client>(
            API_ROUTES.clients.base,
            {
                method: "POST",
                body: body as CreateClientRequest,
            },
        );

        return NextResponse.json(createdClient, {
            status: 201,
        });
    } catch (error) {
        return routeErrorResponse(error);
    }
}