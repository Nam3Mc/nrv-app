import 'server-only'
import { cookies } from 'next/headers'
import { serverEnv } from '../config/server-env'
import { ApiError, ApiErrorResponse, ServerApiRequestOptions } from '../types/api.types'

function buildApiUrl(path: string): string {
    const baseUrl = serverEnv.api.baseUrl.replace(/\/$/, "")
    const cleanPath = path.startsWith('/') ? path : `/${path}`

    return `${baseUrl}${cleanPath}`
}

function isJsonBody(body: unknown): boolean {
    if (!body) {
        return false
    }

    if (typeof body !== 'object') {
        return false
    }

    if (body instanceof FormData) {
        return false
    }

    if (body instanceof URLSearchParams) {
        return false
    }

    if (body instanceof Blob) {
        return false
    }

    if (body instanceof ArrayBuffer) {
        return false
    }

    return true
}

function prepareBody(body: unknown): BodyInit | undefined {
    if (!body) {
        return undefined
    }

    if (isJsonBody(body)) {
        return JSON.stringify(body)
    }

    return body as BodyInit
}

function getApiErrorMessage(errorBody: unknown):string {
    if (!errorBody) {
        return 'Unexpected API error'
    }

    if (typeof errorBody === 'string') {
        return errorBody
    }

    const apiError = errorBody as ApiErrorResponse

    if (Array.isArray(apiError.message)) {
        return apiError.message.join(', ')
    }

    if (apiError.message) {
        return apiError.message
    }

    if (apiError.error) {
        return apiError.error
    }

    return 'Unexpected API error'
}

async function parseResponseBody(response: Response): Promise<unknown> {
    const contentType = response.headers.get('content-type')

    if (response.status === 204) {
        return null
    }

    if (contentType?.includes('application/json')) {
        return response.json()
    }

    return response.text()
}

export async function serverApiClient<TResponse>(
    path: string,
    options: ServerApiRequestOptions = {},
): Promise<TResponse> {
    const {
        body,
        headers,
        auth = true,
        cache = 'no-store',
        ...restOptions
    } = options

    const requestHeaders = new Headers(headers)
    const preparedBody = prepareBody(body)
    
    if (isJsonBody(body) && !requestHeaders.has('Content-Type')) {
        requestHeaders.set('Content-Type', 'application/json')
    }

    if (!requestHeaders.has('Accept')) {
        requestHeaders.set('Accept', 'application/json')
    }

    if (auth) {
        const cookieStore = await cookies()
        const token = cookieStore.get(serverEnv.auth.tokenCookieName)?.value

        if (!token) {
            throw new ApiError({
                message: 'Unautorized',
                statusCode: 401
            })
        }

        requestHeaders.set('Authorization', `Bearer ${token}`)
    }

    const response = await fetch(buildApiUrl(path), {
        ...restOptions,
        body: preparedBody,
        cache,
        headers: requestHeaders
    })

    const responseBody = await parseResponseBody(response)

    if (!response.ok) {
        throw  new ApiError({
            message: getApiErrorMessage(responseBody),
            statusCode: response.status,
            details: responseBody,
        })
    }

    return responseBody as TResponse
}