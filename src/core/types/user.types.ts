export type UserRole = 'ADMIN' | 'TECHNICIAN'

export interface User {
    id: string
    firstName: string
    lastName: string
    email: string 
    phone: string | null
    documentNumber: string
    role: UserRole
    isActive: boolean
    profilePhotoUrl: string
}

export interface AuthUser {
    id: string
    email: string
    role: UserRole
    firstName: string
    lastName: string
    profilePhotoUrl: string
}