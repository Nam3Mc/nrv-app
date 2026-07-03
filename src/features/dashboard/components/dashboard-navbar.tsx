'use client'

import { APP_ROUTES } from "@/core/constants/app-routes"
import { UserRole } from "@/core/types/user.types"
import { LogoutUser } from "@/features/auth/services/logout.service"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { 
    Bell, 
    ChevronDown,
    LogOut,
    ShieldCheck,
    UserCircle
} from 'lucide-react'

interface DashboardNavbarProps {
    role: UserRole
}

const roleLabels: Record<UserRole, string> = {
    ADMIN: 'Administrador',
    TECHNICIAN: 'Tecnico'
}

export function DashboardNavbar({role}: DashboardNavbarProps) {
    const router = useRouter()
    const [isLoggingOut, setIsLogginOut] = useState(false)
    const [ logoutError, setLogoutError] = useState<string | null>(null)

    async function handleLogout() {
        setIsLogginOut(true)
        setLogoutError(null)

        try {
            await LogoutUser()
            router.replace(APP_ROUTES.login)
            router.refresh()
        } catch {
            setLogoutError('No se pudo Cerrar sesion.')
        } finally {
            setIsLogginOut(false)
        }
    }

    return (
        <header className="border-b border-border-subtle/60 bg-background/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-32 lg:px-8">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-white shadow-sm lg:h-14 lg:w-14">
                        <ShieldCheck className="h-10 w-10 lg:h-8 lg:w-8" />
                    </div>

                    <div>
                        <p className="text-3xl font-bold leading-none tracking-tight text-primary lg:text-2xl">
                            NRV
                        </p>

                        <p className="mt-1 text-lg font-medium text-muted lg:text-sm">
                            Control de Servicios
                        </p>
                    </div>
                </div>

                <div className="hidden items-center gap-4 lg:flex">
                    <button
                        type="button"
                        className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-white px-5 py-4 text-sm font-semibold text-primary shadow-sm transition hover:bg-surface-light"
                    >
                        <UserCircle className="h-7 w-7 text-primary" />

                        <span>{roleLabels[role]}</span>

                        <ChevronDown className="h-4 w-4 text-muted" />
                    </button>

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-2 rounded-2xl border border-border-subtle bg-white px-5 py-4 text-sm font-semibold text-danger shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        <LogOut className="h-5 w-5" />

                        <span>
                            {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
                        </span>
                    </button>
                </div>

                <div className="flex items-center gap-3 lg:hidden">
                    <button
                        type="button"
                        className="flex h-14 w-14 items-center justify-center rounded-3xl border border-border-subtle bg-white text-primary shadow-sm"
                        aria-label="Notificaciones"
                    >
                        <Bell className="h-6 w-6" />
                    </button>

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex h-14 items-center gap-2 rounded-3xl border border-border-subtle bg-white px-5 text-base font-semibold text-danger shadow-sm disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        <LogOut className="h-5 w-5" />

                        <span>
                            {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
                        </span>
                    </button>
                </div>
            </div>

            {logoutError ? (
                <div className="mx-auto w-full max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
                    <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-danger">
                        {logoutError}
                    </p>
                </div>
            ) : null}
        </header>
    );
}