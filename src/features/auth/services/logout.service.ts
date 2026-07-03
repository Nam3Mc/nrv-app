import { INTERNAL_API_ROUTES } from "@/core/constants/internal-api-routes"
import { clientApiClient } from "@/core/lib/client-api-client"

interface LogoutResponse {
    success: boolean
}

export async function LogoutUser(): Promise<LogoutResponse> {
    return clientApiClient<LogoutResponse>(
        INTERNAL_API_ROUTES.auth.logout,
        {
            method: 'POST'
        }
    )
}