export interface CreateTechnicianRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    documentNumber: string;
    password: string;
    role?: "TECHNICIAN" | string;
}

export interface Technician {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    documentNumber?: string;
    role: string;
    profilePhotoUrl?: string | null;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}