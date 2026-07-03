import { UserRole } from "@/core/types/user.types";
import React from "react";
import { DashboardNavbar } from "./dashboard-navbar";

interface DashboardShellProps {
    role: UserRole
    children: React.ReactNode
}

export function DashboardShell({ role, children }: DashboardShellProps) {
    return (
        <div className="min-h-screen bg-background text-primary">
            <DashboardNavbar role={role} />
            <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-12 lg:pt-9">
                {children}
            </main>
        </div>
    )
}