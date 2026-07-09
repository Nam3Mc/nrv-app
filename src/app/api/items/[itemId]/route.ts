import { NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import {
    readJsonRequestBody,
    routeErrorResponse,
} from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";
import type { Item } from "@/features/items/types/item.types";

interface RouteParams {
    params: Promise<{
        itemId: string;
    }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
    try {
        const { itemId } = await params;
        const body = await readJsonRequestBody(request);

        const updatedItem = await serverApiClient<Item>(
            API_ROUTES.items.getById(itemId),
            {
                method: "PATCH",
                body,
            },
        );

        return NextResponse.json(updatedItem);
    } catch (error) {
        return routeErrorResponse(error);
    }
}