"use client";

import { useMemo } from "react";

import type { TechnicianService } from "../types/technician-service.types";
import { AssignedServiceCard } from "./assigned-service-card";

interface AssignedServicesListProps {
  services: TechnicianService[];
  onStartService: (service: TechnicianService) => void;
  onCompleteService: (service: TechnicianService) => void;
  onPrintCertificate: (service: TechnicianService) => void;
}

export function AssignedServicesList({
  services,
  onStartService,
  onCompleteService,
  onPrintCertificate,
}: AssignedServicesListProps) {
  const orderedServices = useMemo(
    () =>
      [...services].sort(
        (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
      ),
    [services]
  );

  if (orderedServices.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-12">
        <h2 className="text-lg font-semibold text-slate-800">
          No tienes servicios asignados
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Cuando un administrador te asigne un servicio aparecerá en esta lista.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4 sm:space-y-6">
      <header className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Servicios asignados
        </h2>
        <p className="text-sm text-slate-500">
          {orderedServices.length} servicio{orderedServices.length !== 1 ? "s" : ""} asignado
          {orderedServices.length !== 1 ? "s" : ""}
        </p>
      </header>

      {orderedServices.map((service) => (
        <AssignedServiceCard
          key={service.id}
          service={service}
          onStartService={onStartService}
          onCompleteService={onCompleteService}
          onPrintCertificate={onPrintCertificate}
        />
      ))}
    </section>
  );
}