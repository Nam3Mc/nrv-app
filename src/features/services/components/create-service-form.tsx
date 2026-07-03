"use client";

import { useState } from "react";

interface CreateServiceFormProps {
    onSuccess: () => void;
}

export function CreateServiceForm({ onSuccess }: CreateServiceFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        const payload = {
            clientId: String(formData.get("clientId") ?? ""),
            technicianIds: [String(formData.get("technicianId") ?? "")],
            scheduledAt: String(formData.get("scheduledAt") ?? ""),
            servicePrice: Number(formData.get("servicePrice") ?? 0),
            notes: String(formData.get("notes") ?? "") || undefined,
            certificateExpiresAt:
                String(formData.get("certificateExpiresAt") ?? "") || undefined,
        };

        console.log("Create service payload:", payload);

        setIsSubmitting(false);
        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-xl border border-warning/20 bg-warning/10 px-4 py-3 text-sm text-warning-foreground">
                Este formulario necesita cargar clientes y técnicos reales desde el backend.
                En el siguiente paso conectamos esos selects.
            </div>

            <input
                name="clientId"
                required
                placeholder="Client ID"
                className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
            />

            <input
                name="technicianId"
                required
                placeholder="Technician ID"
                className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
            />

            <input
                name="scheduledAt"
                type="datetime-local"
                required
                className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
            />

            <input
                name="servicePrice"
                type="number"
                min="1"
                required
                placeholder="Precio del servicio"
                className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
            />

            <input
                name="certificateExpiresAt"
                type="datetime-local"
                className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
            />

            <textarea
                name="notes"
                rows={4}
                placeholder="Notas"
                className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors resize-none"
            />

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-hover disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Guardando..." : "Crear servicio"}
                </button>
            </div>
        </form>
    );
}