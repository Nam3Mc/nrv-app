"use client";

import type { TechnicianStatistics } from "../types/technician-service.types";

interface TechnicianSidebarProps {
  statistics: TechnicianStatistics;
}

export function TechnicianSidebar({ statistics }: TechnicianSidebarProps) {
  return (
    <aside className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:w-72 lg:shrink-0 lg:p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 lg:mb-6">
        Resumen
      </h2>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-4">
        <StatisticCard label="Total de servicios" value={statistics.totalServices} />
        <StatisticCard label="Programados" value={statistics.scheduledServices} />
        <StatisticCard label="Completados" value={statistics.completedServices} />
        <StatisticCard label="Cancelados" value={statistics.canceledServices} />
      </div>
    </aside>
  );
}

interface StatisticCardProps {
  label: string;
  value: number | string;
}

function StatisticCard({ label, value }: StatisticCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 p-3 transition-shadow hover:shadow-sm lg:p-4">
      <p className="text-xs font-medium text-slate-500 lg:text-sm">{label}</p>
      <p className="mt-1 text-2xl font-bold text-green-700 lg:mt-2 lg:text-3xl">
        {value}
      </p>
    </article>
  );
}