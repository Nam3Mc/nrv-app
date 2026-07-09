export interface CreateClientRequest {
    companyName: string;
    address: string;
    phone: string;
    NIT?: string;
    email?: string;
    contactFirstName?: string;
    contactLastName?: string;
}

export interface Client {
    id: string;
    companyName: string;
    address: string;
    phone: string;
    NIT?: string | null;
    email?: string | null;
    contactFirstName?: string | null;
    contactLastName?: string | null;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
    nextServiceDate?: string | null | undefined;
}