export const INTERNAL_API_ROUTES = {
    auth: {
        login: "/api/auth/login",
        logout: "/api/auth/logout",
        me: "/api/auth/me",
    },

    clients: {
        base: "/api/clients",
        byId: (clientId: string) => `/api/clients/${clientId}`,
        update: (clientId: string) => `/api/clients/update/${clientId}`,
        deactivate: (clientId: string) => `/api/clients/deactivate/${clientId}`,
        activate: (clientId: string) => `/api/clients/activate/${clientId}`,
    },

    services: {
        base: "/api/services",
        byId: (serviceId: string) => `/api/services/${serviceId}`,
        update: (serviceId: string) => `/api/services/update/${serviceId}`,
        cancel: (serviceId: string) => `/api/services/cancel/${serviceId}`,
        complete: (serviceId: string) => `/api/services/complete/${serviceId}`,
        certificate: (serviceId: string) => `/api/services/certificate/${serviceId}`,
        uploadBeforePhotos: (serviceId: string) => `/api/services/${serviceId}/photos/before`,
        uploadAfterPhotos: (serviceId: string) => `/api/services/${serviceId}/photos/after`,
    },

    items: {
        base: "/api/items",
        byId: (itemId: string) => `/api/items/${itemId}`,
        update: (itemId: string) => `/api/items/update/${itemId}`,
    },

    technicians: {
        base: "/api/technicians",
        byId: (technicianId: string) => `/api/technicians/${technicianId}`,
        update: (technicianId: string) => `/api/technicians/update/${technicianId}`,
        deactivate: (technicianId: string) => `/api/technicians/deactivate/${technicianId}`,
        activate: (technicianId: string) => `/api/technicians/activate/${technicianId}`,
        assignedServices: `/api/technicians/assigned-services`,
        statistics: `/api/technicians/statistics`,
    },

    dashboard: {
        expiringCertificates:
            "/api/dashboard/expiring-certificates",
    },
} as const;