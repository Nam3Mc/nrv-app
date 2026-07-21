"use client";

import { AssignedServicesList } from "@/features/technicians/components/assigned-services-list";
import { StartServiceModal } from "@/features/technicians/components/start-service-modal";
import { TechnicianNavbar } from "@/features/technicians/components/navbar";
import { TechnicianStatistics } from "@/features/technicians/components/technician-statistics";
import { useTechnicianPortal } from "@/features/technicians/hooks/use-technician-portal";

export default function TechPortalPage() {
  const {
    loading,
    services,
    statistics,
    modalOpen,
    selectedService,
    setModalOpen,
    handleStartClick,
    handleStartConfirm,
    handleComplete,
    handlePrintCertificate,
    user,
  } = useTechnicianPortal();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Cargando servicios...</p>
      </main>
    );
  }

  return (
    <>
      <TechnicianNavbar
        fullName={user?.fullName || "Técnico"}
        role={user?.role || "TECHNICIAN"}
        onOpenMenu={() => {}} // opcional: implementar drawer
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <aside className="w-full lg:w-80 lg:shrink-0">
            <TechnicianStatistics statistics={statistics} />
          </aside>

          <section className="min-w-0 flex-1">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Mis servicios
              </h1>
              <p className="mt-1 text-sm text-slate-500 sm:mt-2">
                Aquí puedes iniciar, completar y consultar los servicios que tienes
                asignados.
              </p>
            </div>

            <AssignedServicesList
              services={services}
              onStartService={handleStartClick}
              onCompleteService={handleComplete}
              onPrintCertificate={handlePrintCertificate}
            />
          </section>
        </div>
      </main>

      <StartServiceModal
        open={modalOpen}
        service={selectedService}
        onClose={() => setModalOpen(false)}
        onConfirm={handleStartConfirm}
      />
    </>
  );
}