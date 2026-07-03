import { NextResponse } from "next/server";

import { ApiError } from "@/core/types/api.types";

export function routeErrorResponse(error: unknown) {
    if (error instanceof ApiError) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                details: error.details,
            },
            {
                status: error.statusCode,
            },
        );
    }

    console.error("[INTERNAL_ROUTE_ERROR]", error);

    return NextResponse.json(
        {
            success: false,
            message: "Unexpected server error",
        },
        {
            status: 500,
        },
    );
}

export async function readJsonRequestBody(request: Request): Promise<unknown> {
    try {
        return await request.json();
    } catch {
        throw new ApiError({
            message: "Invalid JSON body",
            statusCode: 400,
        });
    }
}

export function buildPathWithSearchParams(basePath: string, request: Request) {
    const url = new URL(request.url);
    const search = url.searchParams.toString();

    if (!search) {
        return basePath;
    }

    return `${basePath}?${search}`;
}