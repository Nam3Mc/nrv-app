import { requireAuth } from "@/core/auth/require-auths";
import { clientEnv } from "@/core/config/client-env";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { QuickActionsCar } from "@/features/dashboard/components/quick-actions-card";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Dashboard | ${clientEnv.app.name}`,
    description: 'Panel de control administrativo de servicios.'
}

export default async function DashboardPage() {
    const session = await requireAuth(['ADMIN'])

    return (
        <DashboardShell role={session.role}>
            <QuickActionsCar />
        </DashboardShell>
    )
}