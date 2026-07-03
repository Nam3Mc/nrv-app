import 'server-only'
import { UserRole } from '../types/user.types'
import { cookies } from 'next/headers'
import { serverEnv } from '../config/server-env'

const VALID_ROLES: UserRole[] = ['ADMIN', 'TECHNICIAN']

function isValidRole(role: string | undefined): role is UserRole {
    if (!role) {
        return false
    }

    return VALID_ROLES.includes(role as UserRole)
}

export interface AuthSession {
    token: string
    role: UserRole
}

export async function getAuthSession(): Promise<AuthSession | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get(serverEnv.auth.tokenCookieName)?.value
    const role = cookieStore.get(serverEnv.auth.roleCookieName)?.value

    if (!token || !isValidRole(role)) {
        return null
    }

    return {
        token,
        role
    }
}