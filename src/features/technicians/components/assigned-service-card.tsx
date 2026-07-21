// components/assigned-service-card.tsx
"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import type { TechnicianService } from "../types/technician-service.types";
import { ServiceActions } from "./service-actions";
import { ServiceInformationRow } from "./service-information-row";
import { ServiceStatusBadge } from "./service-status-badge";

interface AssignedServiceCardProps {
  service: TechnicianService;
  onStartService: (service: TechnicianService) => void;
  onCompleteService: (service: TechnicianService) => void;
  onPrintCertificate: (service: TechnicianService) => void;
}

export function AssignedServiceCard({
  service,
  onStartService,
  onCompleteService,
  onPrintCertificate,
}: AssignedServiceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full flex-col items-start gap-3 p-4 text-left transition hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-4 sm:p-6"
      >
        <div className="flex-1 space-y-1.5 sm:space-y-2">
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
            {service.client.companyName}
          </h2>
          <p className="text-sm text-slate-600">{service.client.address}</p>
          <p className="text-sm text-slate-500">
            {new Date(service.scheduledAt).toLocaleString("es-CO")}
          </p>
        </div>

        <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
          <ServiceStatusBadge status={service.status} />
          {expanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
        </div>
      </button>

      {expanded && (
        <div className="space-y-6 border-t border-slate-200 p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
            <ServiceInformationRow label="Company" value={service.client.companyName} />
            <ServiceInformationRow label="Address" value={service.client.address} />
            <ServiceInformationRow label="Phone" value={service.client.phone} />
            <ServiceInformationRow
              label="Scheduled"
              value={new Date(service.scheduledAt).toLocaleString("es-CO")}
            />
            <ServiceInformationRow label="Contact" value={service.client.contactFirstName} />
            <ServiceInformationRow label="Status" value={service.status} />
          </div>

          <ServiceActions
            service={service}
            onStartService={onStartService}
            onCompleteService={onCompleteService}
            onPrintCertificate={onPrintCertificate}
          />
        </div>
      )}
    </article>
  );
}