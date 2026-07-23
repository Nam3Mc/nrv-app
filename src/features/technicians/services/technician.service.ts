import { INTERNAL_API_ROUTES } from "@/core/constants/internal-api-routes";
import { clientApiClient } from "@/core/lib/client-api-client";
import type {
    CreateTechnicianRequest,
    Technician,
} from "@/features/technicians/types/technician.types";
import type {
    TechnicianService,
    TechnicianStatistics,
} from "@/features/technicians/types/technician-service.types";

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

export async function getAssignedServices(): Promise<TechnicianService[]> {
    return clientApiClient<TechnicianService[]>(
        INTERNAL_API_ROUTES.technicians.assignedServices,
        {
            method: "GET",
        },
    );
}

export async function getTechnicianStatistics(): Promise<TechnicianStatistics> {
    return clientApiClient<TechnicianStatistics>(
        INTERNAL_API_ROUTES.technicians.statistics,
        {
            method: "GET",
        },
    );
}

export async function startService(
    serviceId: string,
    photos: File[],
) {
    const formData = new FormData();

    photos.forEach((photo) => {
        formData.append("photos", photo);
    });

    return clientApiClient(
        INTERNAL_API_ROUTES.technicians.start(serviceId),
        {
            method: "POST",
            body: formData,
        },
    );
}

export async function completeService(
    serviceId: string,
): Promise<void> {
    await clientApiClient<void>(
        INTERNAL_API_ROUTES.services.complete(serviceId),
        {
            method: "PATCH",
        },
    );
}