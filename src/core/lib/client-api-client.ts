import { ApiError } from "@/core/types/api.types";

interface ClientApiRequestOptions extends Omit<RequestInit, "body" | "headers"> {
    body?: unknown;
    headers?: HeadersInit;
}

interface ClientApiErrorResponse {
    message?: string;
    errors?: unknown;
}

function isJsonBody(body: unknown): boolean {
    if (!body) {
        return false;
    }

    if (typeof body !== "object") {
        return false;
    }

    if (body instanceof FormData) {
        return false;
    }

    if (body instanceof URLSearchParams) {
        return false;
    }

    return true;
}

function prepareBody(body: unknown): BodyInit | undefined {
    if (!body) {
        return undefined;
    }

    if (isJsonBody(body)) {
        return JSON.stringify(body);
    }

    return body as BodyInit;
}

async function parseResponseBody(response: Response): Promise<unknown> {
    const contentType = response.headers.get("content-type");

    if (response.status === 204) {
        return null;
    }

    if (contentType?.includes("application/json")) {
        return response.json();
    }

    return response.text();
}

function getClientApiErrorMessage(responseBody: unknown): string {
    if (!responseBody) {
        return "Unexpected request error";
    }

    if (typeof responseBody === "string") {
        return responseBody;
    }

    const apiError = responseBody as ClientApiErrorResponse;

    if (apiError.message) {
        return apiError.message;
    }

    return "Unexpected request error";
}

export async function clientApiClient<TResponse>(
    path: string,
    options: ClientApiRequestOptions = {},
): Promise<TResponse> {
    const { body, headers, cache = "no-store", ...restOptions } = options;

    const requestHeaders = new Headers(headers);
    const preparedBody = prepareBody(body);

    
    if (isJsonBody(body) && !requestHeaders.has("Content-Type")) {
        requestHeaders.set("Content-Type", "application/json");
    }
    
    if (!requestHeaders.has("Accept")) {
        requestHeaders.set("Accept", "application/json");
    }

    const response = await fetch(path, {
        ...restOptions,
        body: preparedBody,
        cache,
        headers: requestHeaders,
    });
    
    const responseBody = await parseResponseBody(response);

    if (!response.ok) {
        throw new ApiError({
            message: getClientApiErrorMessage(responseBody),
            statusCode: response.status,
            details: responseBody,
        });
    }

    return responseBody as TResponse;

}