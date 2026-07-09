export type ServiceStatus = "SCHEDULED" | "COMPLETED" | "CANCELED";

export interface ServiceClient {
    id: string;
    companyName: string;
    address?: string | null;
}

export interface ServiceTechnician {
    id: string;
    firstName: string;
    lastName: string;
}

export interface CreateServiceRequest {
    clientId: string;
    technicianIds: string[];
    scheduledAt: string;
    servicePrice: number;
    notes?: string;
    certificateExpiresAt?: string;
}

export interface Service {
    id: string;
    clientId: string;
    scheduledAt: string;
    servicePrice: number;
    notes?: string | null;
    certificateExpiresAt?: string | null;
    status: ServiceStatus;

    client?: ServiceClient | null;
    technicians?: ServiceTechnician[];

    createdAt?: string;
    updatedAt?: string;
}