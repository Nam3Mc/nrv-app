"use client";

import type {
  TechnicianService,
  TechnicianStatistics,
} from "../types/technician-service.types";
import { AssignedServicesList } from "./assigned-services-list";
import { TechnicianSidebar } from "./technician-sidebar";

interface TechnicianDashboardProps {
  services: TechnicianService[];
  statistics: TechnicianStatistics;
  onStartService: (service: TechnicianService) => void;
  onCompleteService: (service: TechnicianService) => void;
  onPrintCertificate: (service: TechnicianService) => void;
}

export function TechnicianDashboard({
  services,
  statistics,
  onStartService,
  onCompleteService,
  onPrintCertificate,
}: TechnicianDashboardProps) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:flex-row">
      <TechnicianSidebar statistics={statistics} />
      <AssignedServicesList
        services={services}
        onStartService={onStartService}
        onCompleteService={onCompleteService}
        onPrintCertificate={onPrintCertificate}
      />
    </section>
  );
}