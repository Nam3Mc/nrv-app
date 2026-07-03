import { INTERNAL_API_ROUTES } from "@/core/constants/internal-api-routes";
import { clientApiClient } from "@/core/lib/client-api-client";
import type {
    CreateServiceRequest,
    Service,
} from "@/features/services/types/service.types";

export async function getServices(): Promise<Service[]> {
    return clientApiClient<Service[]>(INTERNAL_API_ROUTES.services.base, {
        method: "GET",
    });
}

export async function createService(
    payload: CreateServiceRequest,
): Promise<Service> {
    return clientApiClient<Service>(INTERNAL_API_ROUTES.services.base, {
        method: "POST",
        body: payload,
    });
}