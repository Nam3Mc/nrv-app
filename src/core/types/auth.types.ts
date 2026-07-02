import type { AuthUser } from "@/core/types/user.types";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface BackendLoginResponse {
    accessToken: string;
    tokenType: "Bearer";
    user: AuthUser;
}

export interface LoginRouteResponse {
    success: boolean;
    redirectTo: string;
    user: AuthUser;
}

export interface AuthSession {
    user: AuthUser;
}