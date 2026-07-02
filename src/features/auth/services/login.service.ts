import { INTERNAL_API_ROUTES } from "@/core/constants/internal-api-routes";
import { clientApiClient } from "@/core/lib/client-api-client";
import { LoginRequest, LoginRouteResponse } from "@/core/types/auth.types";

export async function loginUser( loginData: LoginRequest ): Promise<LoginRouteResponse> {
    return clientApiClient<LoginRouteResponse>(
        INTERNAL_API_ROUTES.auth.login,
        {
            method:  "POST",
            body: loginData
        }
    )
} 