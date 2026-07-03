export const INTERNAL_API_ROUTES = {
    auth: {
        login: "/api/auth/login",
        logout: "/api/auth/logout",
        me: "/api/auth/me",
    },

    clients: {
        base: "/api/clients",
    },

    services: {
        base: "/api/services",
    },

    items: {
        base: "/api/items",
    },

    technicians: {
        base: "/api/technicians",
    },
} as const;