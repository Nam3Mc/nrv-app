import { INTERNAL_API_ROUTES } from "@/core/constants/internal-api-routes";
import { clientApiClient } from "@/core/lib/client-api-client";
import type {
    CreateTechnicianRequest,
    Technician,
} from "@/features/technicians/types/technician.types";

export async function getTechnicians(): Promise<Technician[]> {
    return clientApiClient<Technician[]>(
        INTERNAL_API_ROUTES.technicians.base,
        {
            method: "GET",
        },
    );
}

export async function createTechnician(
    payload: CreateTechnicianRequest,
): Promise<Technician> {
    return clientApiClient<Technician>(
        INTERNAL_API_ROUTES.technicians.base,
        {
            method: "POST",
            body: payload,
        },
    );
}

export async function updateTechnician(
    technicianId: string,
    payload: Partial<CreateTechnicianRequest> & { isActive?: boolean },
): Promise<Technician> {
    return clientApiClient<Technician>(
        INTERNAL_API_ROUTES.technicians.byId(technicianId),
        {
            method: "PATCH",
            body: payload,
        },
    );
}