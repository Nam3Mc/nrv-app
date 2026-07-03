import { NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import {
    buildPathWithSearchParams,
    readJsonRequestBody,
    routeErrorResponse,
} from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";
import type {
    CreateItemRequest,
    Item,
} from "@/features/items/types/item.types";

export async function GET(request: Request) {
    try {
        const backendPath = buildPathWithSearchParams(
            API_ROUTES.items.base,
            request,
        );

        const items = await serverApiClient<Item[]>(backendPath, {
            method: "GET",
        });

        return NextResponse.json(items);
    } catch (error) {
        return routeErrorResponse(error);
    }
}

export async function POST(request: Request) {
    try {
        const body = await readJsonRequestBody(request);

        const createdItem = await serverApiClient<Item>(
            API_ROUTES.items.base,
            {
                method: "POST",
                body: body as CreateItemRequest,
            },
        );

        return NextResponse.json(createdItem, {
            status: 201,
        });
    } catch (error) {
        return routeErrorResponse(error);
    }
}