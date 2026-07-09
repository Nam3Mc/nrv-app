import type { Metadata } from "next";

import { requireAuth } from "@/core/auth/require-auths";
import { clientEnv } from "@/core/config/client-env";
import { DashboardBottomLists } from "@/features/dashboard/components/dashboard-bottom-lists";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { ExpiringCertificatesCard } from "@/features/dashboard/components/expiring-certificates-card";
import { QuickActionsCard } from "@/features/dashboard/components/quick-actions-card";
import { WeeklyServicesCard } from "@/features/dashboard/components/weekly-services-card";

export const metadata: Metadata = {
    title: `Dashboard | ${clientEnv.app.name}`,
    description: "Panel de control administrativo de servicios.",
};

export default async function DashboardPage() {
    const session = await requireAuth(["ADMIN"]);

    return (
        <DashboardShell role={session.role}>
            <section className="grid gap-5 lg:grid-cols-[1fr_1.35fr_1fr] lg:items-start">
                <div className="order-2 lg:order-1">
                    <QuickActionsCard />
                </div>

                <div className="order-1 lg:order-2">
                    <WeeklyServicesCard />
                </div>

                <div className="order-3 lg:order-3">
                    <ExpiringCertificatesCard />
                </div>
            </section>

            <DashboardBottomLists />
        </DashboardShell>
    );
}