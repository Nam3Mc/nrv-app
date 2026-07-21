export const API_ROUTES = {
    auth: {
        login: "/auth/login",
        logout: "/auth/logout",
    },

    users: {
        base: "/user",
        getById: (userId: string) => `/user/${userId}`,
        update: (userId: string) => `/user/${userId}`,
        activate: (userId: string) => `/user/${userId}/activate`,
        deactivate: (userId: string) => `/user/${userId}/deactivate`,
        updatePhoto: (userId: string) => `/user/${userId}/profile-photo`,

        // Endpoints del usuario autenticado
        myProfile: "/user/me",
        statistics: (userId: string) => `/user/${userId}/statistics`,
    },

    clients: {
        base: "/clients",
        getById: (clientId: string) => `/clients/${clientId}`,
        update: (clientId: string) => `/clients/${clientId}`,
        activate: (clientId: string) => `/clients/${clientId}/activate`,
        deactivate: (clientId: string) => `/clients/${clientId}/deactivate`,
    },

    items: {
        base: "/items",
        getById: (itemId: string) => `/items/${itemId}`,
        update: (itemId: string) => `/items/${itemId}`,
        activate: (itemId: string) => `/items/${itemId}/activate`,
        deactivate: (itemId: string) => `/items/${itemId}/deactivate`,
    },

    services: {
        base: "/services",
        getById: (serviceId: string) => `/services/${serviceId}`,
        update: (serviceId: string) => `/services/${serviceId}`,
        cancel: (serviceId: string) => `/services/${serviceId}/cancel`,
        complete: (serviceId: string) => `/services/${serviceId}/complete`,
        start: (serviceId: string) => `/services/${serviceId}/start`,
        uploadBeforePhotos: (serviceId: string) => `/services/${serviceId}/photos/before`,
        uploadAfterPhotos: (serviceId: string) => `/services/${serviceId}/photos/after`,
        certificate: (serviceId: string) => `/services/${serviceId}/certificate`,

        // Servicios del técnico autenticado
        myServices: "/services/me",
    },
} as const;