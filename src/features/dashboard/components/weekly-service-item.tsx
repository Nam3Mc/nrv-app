import { Clock, MapPin, UserRound } from "lucide-react";

import {
    formatServiceTime,
} from "@/features/dashboard/utils/calendar.utils";
import type { Service } from "@/features/services/types/service.types";

interface WeeklyServiceItemProps {
    service: Service;
}

function getTechniciansLabel(service: Service): string {
    if (!service.technicians || service.technicians.length === 0) {
        return "Sin técnico asignado";
    }

    return service.technicians
        .map((technician) => `${technician.firstName} ${technician.lastName}`)
        .join(", ");
}

function getClientName(service: Service): string {
    return service.client?.companyName ?? "Cliente no disponible";
}

function getClientAddress(service: Service): string {
    return service.client?.address ?? "Dirección no disponible";
}

export function WeeklyServiceItem({ service }: WeeklyServiceItemProps) {
    return (
        <article className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-sm font-bold text-primary">
                        {getClientName(service)}
                    </h3>

                    <p className="mt-1 flex items-center gap-2 text-xs text-muted">
                        <MapPin className="h-4 w-4" />
                        {getClientAddress(service)}
                    </p>
                </div>

                <span className="rounded-full bg-surface-light px-3 py-1 text-xs font-bold text-primary">
                    {service.status ?? "Programado"}
                </span>
            </div>

            <div className="mt-4 grid gap-2 text-xs text-muted sm:grid-cols-2">
                <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {formatServiceTime(service.scheduledAt)}
                </p>

                <p className="flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-primary" />
                    {getTechniciansLabel(service)}
                </p>
            </div>

            {service.notes ? (
                <p className="mt-3 rounded-xl bg-surface-light px-3 py-2 text-xs text-muted">
                    {service.notes}
                </p>
            ) : null}
        </article>
    );
}