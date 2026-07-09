import { INTERNAL_API_ROUTES } from "@/core/constants/internal-api-routes";
import { clientApiClient } from "@/core/lib/client-api-client";

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

import type {
    CreateServiceRequest,
    Service,
    ServiceStatus,
} from "@/features/services/types/service.types";

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {
    status?: ServiceStatus;
}

export async function updateService(
    serviceId: string,
    payload: UpdateServiceRequest,
): Promise<Service> {
    return clientApiClient<Service>(
        INTERNAL_API_ROUTES.services.byId(serviceId),
        {
            method: "PATCH",
            body: payload,
        },
    );
}