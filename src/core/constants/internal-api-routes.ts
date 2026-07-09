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
    },

    items: {
        base: "/api/items",
        byId: (itemId: string) => `/api/items/${itemId}`,
    },

    technicians: {
        base: "/api/technicians",
        byId: (technicianId: string) => `/api/technicians/${technicianId}`,
    },

    dashboard: {
        expiringCertificates: "/api/dashboard/expiring-certificates",
    },
} as const;