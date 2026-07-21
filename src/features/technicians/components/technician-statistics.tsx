"use client";

import type { TechnicianStatistics as TechnicianStatisticsType } from "../types/technician-service.types";

interface TechnicianStatisticsProps {
  statistics: TechnicianStatisticsType;
}

export function TechnicianStatistics({ statistics }: TechnicianStatisticsProps) {
  return (
    <aside className="space-y-3 sm:space-y-5">
      <StatisticCard title="Total de servicios" value={statistics.totalServices} />
      <StatisticCard title="Programados" value={statistics.scheduledServices} />
      <StatisticCard title="Completados" value={statistics.completedServices} />
      <StatisticCard title="Cancelados" value={statistics.canceledServices} />
    </aside>
  );
}

interface StatisticCardProps {
  title: string;
  value: number | string;
}

function StatisticCard({ title, value }: StatisticCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-xs font-medium text-slate-500 sm:text-sm">{title}</p>
      <h2 className="mt-2 text-2xl font-bold text-green-700 sm:mt-3 sm:text-3xl">
        {value}
      </h2>
    </div>
  );
}