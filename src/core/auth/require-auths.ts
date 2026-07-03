import 'server-only'
import { UserRole } from '../types/user.types';
import { getAuthSession } from './get-auth-session';
import { redirect } from 'next/navigation';
import { APP_ROUTES, getDashboardRouteByRole } from '../constants/app-routes';

export async function requireAuth(allowedRoles?: UserRole[]) {
    const session = await getAuthSession()

    if (!session) {
        redirect(APP_ROUTES.login)
    }

    if (allowedRoles && !allowedRoles.includes(session.role)) {
        redirect(APP_ROUTES.login)
    }

    if (allowedRoles && !allowedRoles.includes(session.role)) {
        redirect(getDashboardRouteByRole(session.role))
    }

    return session
    
}