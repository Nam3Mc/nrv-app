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
    technicianIds?: string[];
    scheduledAt: string;
    servicePrice: number;
    notes?: string | null;
    certificateExpiresAt?: string | null;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}