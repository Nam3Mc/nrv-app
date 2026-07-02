export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiErrorResponse {
    message?: string | string[]
    error?: string
    statusCode?: number
}

export interface NextFetchOptions {
    revalidate?: number | false
    tags?: string[]
}

export interface ServerApiRequestOptions  
    extends Omit<RequestInit, 'body' | 'headers'> {
        body?: unknown
        headers?: HeadersInit
        auth?: boolean
        next?: NextFetchOptions
}

interface ApiErrorParams {
    message: string
    statusCode: number
    details?: unknown
}

export class ApiError extends Error {
    public readonly statusCode: number
    public readonly details?: unknown

    constructor({ message, statusCode, details}: ApiErrorParams) {
        super(message)

        this.name = 'ApiError'
        this.statusCode = statusCode
        this.details = details
    }
}