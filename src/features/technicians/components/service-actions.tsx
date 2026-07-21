import type { TechnicianService } from "../types/technician-service.types";

interface ServiceActionsProps {
  service: TechnicianService;
  onStartService: (service: TechnicianService) => void;
  onCompleteService: (service: TechnicianService) => void;
  onPrintCertificate: (service: TechnicianService) => void;
}

export function ServiceActions({
  service,
  onStartService,
  onCompleteService,
  onPrintCertificate,
}: ServiceActionsProps) {
  switch (service.status) {
    case "SCHEDULED":
      return (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onStartService(service)}
            className="w-full rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 sm:w-auto"
          >
            Iniciar servicio
          </button>
        </div>
      );

    case "IN_PROGRESS":
      return (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onCompleteService(service)}
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
          >
            Completar servicio
          </button>
        </div>
      );

    case "COMPLETED":
      return (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onPrintCertificate(service)}
            className="w-full rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900 sm:w-auto"
          >
            Imprimir certificado
          </button>
        </div>
      );

    case "CANCELED":
    default:
      return null;
  }
}