export const API_ROUTES = {
    auth: {
        login: '/auth/login',
        logout: '/auth/logout',
    }
    ,
    users: {
        base: '/user',
        getById: (userId: string) => `/user/${userId}`,
        update: (userId: string) => `/user/${userId}`,
        activate: (userId: string) => `/user/${userId}/activate`,
        deactivate: (userId: string) => `/user/${userId}/deactivate`,
        updatePhoto: (userId: string) => `/user/${userId}/profile-photo`,
    },

    clients: {
        base: '/clients',
        getById: (clientId: string) => `/clients/${clientId}`,
        update: (clientId: string) => `/clients/${clientId}`,
        activate: (clientId: string) => `/clients/${clientId}/activate`,
        deactivate: (clientId: string) => `/clients/${clientId}/deactivate`,
    },

    items: {
        base: '/items',
        getById: (itemsId: string) => `/items/${itemsId}`,
        updat: (itemsId: string) => `/items/${itemsId}`,
        activate: (itemsId: string) => `/items/${itemsId}/activate`,
        deactivate: (itemsId: string) => `/items/${itemsId}/deactivate`,
    },

    services: {
        base: '/services',
        getById: (servicesId: string) => `/services/${servicesId}`,
        complete: (servicesId: string) => `/services/${servicesId}/complete`,
        cancel: (servicesId: string) => `/services/${servicesId}/cancel`,
        update: (servicesId: string) => `/services/${servicesId}/update`,
    },

}