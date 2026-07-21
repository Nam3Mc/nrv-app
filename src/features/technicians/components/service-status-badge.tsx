import clsx from "clsx";
import { ServiceStatus } from "@/features/services/types/service.types";

interface ServiceStatusBadgeProps {
  status: ServiceStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  ServiceStatus,
  { label: string; className: string }
> = {
  SCHEDULED: {
    label: "Programado",
    className: "border border-amber-300 bg-amber-100 text-amber-800",
  },
  IN_PROGRESS: {
    label: "En progreso",
    className: "border border-blue-300 bg-blue-100 text-blue-800",
  },
  COMPLETED: {
    label: "Completado",
    className: "border border-emerald-300 bg-emerald-100 text-emerald-800",
  },
  CANCELED: {
    label: "Cancelado",
    className: "border border-red-300 bg-red-100 text-red-700",
  },
};

export function ServiceStatusBadge({
  status,
  className,
}: ServiceStatusBadgeProps) {
  const currentStatus = STATUS_CONFIG[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        currentStatus.className,
        className
      )}
    >
      {currentStatus.label}
    </span>
  );
}