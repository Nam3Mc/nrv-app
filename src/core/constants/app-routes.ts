import type { UserRole } from "@/core/types/user.types";

export const APP_ROUTES = {
    login: "/",
    dashboard: "/dashboard",
    techPortal: "/tech-portal",
    completeService: "/completar-servicio",
} as const;

export function getDashboardRouteByRole(role: UserRole): string {
    if (role === "TECHNICIAN") {
        return APP_ROUTES.techPortal;
    }

    return APP_ROUTES.dashboard;
}