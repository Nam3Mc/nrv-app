export interface TechnicianStatistics {
    totalServices: number;
    scheduledServices: number;
    completedServices: number;
    canceledServices: number;
    
    servicesByMonth: {
        month: string;
        count: number;
    }[];
}

export interface TechnicianClient {
    companyName: string;
    address: string;
    phone: string;
    contactFirstName: string;
}

export interface TechnicianService {
    id: string;
    serviceNumber: string;
    status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
    scheduledAt: string;

    client: TechnicianClient;
}