import { X } from "lucide-react";
import { QuickActionType } from "../types/quick-actions.types";
import { CreateClientForm } from "@/features/clients/components/create-client-form";
import { CreateServiceForm } from "@/features/services/components/create-service-form";
import { CreateItemForm } from "@/features/items/components/create-item-form";
import { CreateTechnicianForm } from "@/features/technicians/components/create-technician-form";

interface QuickActionModalProps {
    actionType: QuickActionType | null
    isOpen: boolean
    onClose: () => void
}

const modalTitles: Record<QuickActionType, string> = {
    client: 'Nuevo Cliente',
    service: 'Nuevo Servicio',
    item: 'Nuevo Item',
    technician: 'Nuevo Tecnico',
}

export function QuickActionModal({actionType, isOpen, onClose}: QuickActionModalProps) {
    if (!isOpen || !actionType) {
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 py-8 backdrop-blur-sm">
            <section className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border-subtle bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-primary">
                            {modalTitles[actionType]}
                        </h2>

                        <p className="mt-1 text-sm text-muted">
                            Completa la información requerida para crear el registro.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:bg-surface-light hover:text-primary"
                        aria-label="Cerrar modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {actionType === "client" ? (
                    <CreateClientForm onSuccess={onClose} />
                ) : null}

                {actionType === "service" ? (
                    <CreateServiceForm onSuccess={onClose} />
                ) : null}

                {actionType === "item" ? (
                    <CreateItemForm onSuccess={onClose} />
                ) : null}

                {actionType === "technician" ? (
                    <CreateTechnicianForm onSuccess={onClose} />
                ) : null}
            </section>
        </div>
    )
}