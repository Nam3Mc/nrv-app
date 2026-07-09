// import { Client } from "@/features/clients/types/client.types";

// export interface ExpiringCertificateClient extends Partial<Client>{
//     daysLeft: number;
// }

// export interface ExpiringCertificatesResponse {
//     clients: ExpiringCertificateClient[];
//     total: number;
//     month: number;
//     year: number;
// }

export interface ExpiringCertificateClient {
    id: string;
    companyName: string;
    nextServiceDate: string;
    daysLeft: number;
    address?: string | null;
    phone?: string | null;
}

export interface ExpiringCertificatesResponse {
    clients: ExpiringCertificateClient[];
    total: number;
    month: number;
    year: number;
}