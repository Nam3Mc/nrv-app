import { Building2, CalendarClock, Phone } from "lucide-react";

import type { ExpiringCertificateClient } from "@/features/dashboard/types/expiring-certificates.types";

interface ExpiringCertificateItemProps {
    client: ExpiringCertificateClient;
}

function formatNextServiceDate(date: string): string {
    return new Intl.DateTimeFormat("es-CO", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

function getDaysLeftLabel(daysLeft: number): string {
    if (daysLeft < 0) {
        return "Vencido";
    }

    if (daysLeft === 0) {
        return "Hoy";
    }

    if (daysLeft === 1) {
        return "Mañana";
    }

    return `En ${daysLeft} días`;
}

function getBadgeClassName(daysLeft: number): string {
    if (daysLeft < 0) {
        return "bg-red-50 text-danger border-red-200";
    }

    if (daysLeft <= 7) {
        return "bg-orange-50 text-orange-700 border-orange-200";
    }

    return "bg-surface-light text-primary border-border-subtle";
}

export function ExpiringCertificateItem({
    client,
}: ExpiringCertificateItemProps) {
    return (
        <article className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm transition hover:border-primary/40 hover:bg-surface">
            <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface-light text-primary">
                    <Building2 className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="truncate text-sm font-bold text-primary">
                                {client.companyName}
                            </h3>

                            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                                <CalendarClock className="h-3.5 w-3.5" />
                                {formatNextServiceDate(client.nextServiceDate)}
                            </p>
                        </div>

                        <span
                            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${getBadgeClassName(
                                client.daysLeft,
                            )}`}
                        >
                            {getDaysLeftLabel(client.daysLeft)}
                        </span>
                    </div>

                    {client.phone ? (
                        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                            <Phone className="h-3.5 w-3.5" />
                            {client.phone}
                        </p>
                    ) : null}
                </div>
            </div>
        </article>
    );
}