"use client";

import { APP_ROUTES } from "@/core/constants/app-routes";
import { UserRole } from "@/core/types/user.types";
import { LogoutUser } from "@/features/auth/services/logout.service";
import { Bell, ChevronDown, LogOut, ShieldCheck, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TechnicianNavbarProps {
  fullName: string;
  role: UserRole;
  onOpenMenu?: () => void;
}

const roleLabels: Record<UserRole, string> = {
  ADMIN: "Administrador",
  TECHNICIAN: "Técnico",
};

export function TechnicianNavbar({ fullName, role, onOpenMenu }: TechnicianNavbarProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  async function handleLogout() {
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      await LogoutUser();
      router.replace(APP_ROUTES.login);
      router.refresh();
    } catch {
      setLogoutError("No se pudo cerrar sesión.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="border-b border-border-subtle/60 bg-background/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-32 lg:px-8">
        {/* Logo */}
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

        {/* Desktop */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-white px-5 py-4 text-sm font-semibold text-primary shadow-sm">
            <UserCircle className="h-7 w-7 text-primary" />
            <span>{fullName}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{roleLabels[role]}</span>
            <ChevronDown className="h-4 w-4 text-muted" />
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 rounded-2xl border border-border-subtle bg-white px-5 py-4 text-sm font-semibold text-danger shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <LogOut className="h-5 w-5" />
            <span>{isLoggingOut ? "Cerrando..." : "Cerrar sesión"}</span>
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">
          {onOpenMenu && (
            <button
              type="button"
              onClick={onOpenMenu}
              className="flex h-14 w-14 items-center justify-center rounded-3xl border border-border-subtle bg-white text-primary shadow-sm"
              aria-label="Abrir menú"
            >
              <Bell className="h-6 w-6" />
            </button>
          )}

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex h-14 items-center gap-2 rounded-3xl border border-border-subtle bg-white px-5 text-base font-semibold text-danger shadow-sm disabled:cursor-not-allowed disabled:opacity-70"
          >
            <LogOut className="h-5 w-5" />
            <span>{isLoggingOut ? "Cerrando..." : "Cerrar sesión"}</span>
          </button>
        </div>
      </div>

      {logoutError && (
        <div className="mx-auto w-full max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-danger">
            {logoutError}
          </p>
        </div>
      )}
    </header>
  );
}