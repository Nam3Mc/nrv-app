import { NextRequest, NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import { routeErrorResponse } from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";

interface Params {
    params: Promise<{
        id: string;
    }>;
}

export async function POST(
    request: NextRequest,
    { params }: Params,
) {
    try {
        const { id } = await params;

        const formData = await request.formData();

        const response = await serverApiClient(
            API_ROUTES.services.start(id),
            {
                method: "POST",
                body: formData,
            },
        );

        return NextResponse.json(response);
    } catch (error) {
        return routeErrorResponse(error);
    }
}