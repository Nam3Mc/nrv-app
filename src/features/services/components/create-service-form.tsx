"use client";

import { useEffect, useState } from "react";
import { createService } from "../services/service.service";
import { ApiError } from "@/core/types/api.types";
import { Technician } from "@/features/technicians/types/technician.types";
import { Client } from "@/features/clients/types/client.types";
import { getTechnicians } from "@/features/technicians/services/technician.service";
import { getClients } from "@/features/clients/services/client.service";

interface CreateServiceFormProps {
    onSuccess: () => void;
}

export function CreateServiceForm({ onSuccess }: CreateServiceFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [technicians, setTechnicians] = useState<Technician[]>([])
    const [clients, setClients] = useState<Client[]>([])

    useEffect(() => {
        async function loadFormData() {
            const clients = await getClients()
            const technicians = await getTechnicians()
            setClients(clients)
            setTechnicians(technicians)
        }
        loadFormData()
    }, [])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const scheduleAtValue = String(formData.get('scheduledAt') ?? '')

        const payload = {
            clientId: String(formData.get("clientId") ?? ""),
            technicianIds: [String(formData.get("technicianId") ?? "")],
            scheduledAt: new Date(scheduleAtValue).toISOString(),
            servicePrice: Number(formData.get("servicePrice") ?? 0),
            notes: String(formData.get("notes") ?? "") || undefined,
        };

        try {
            await createService(payload)
            onSuccess()
        } catch (error) {
            if (error instanceof ApiError) {
                console.error(error.message)
                return 
            }
            console.error('Unepected Create service Error')
        } finally {
            setIsSubmitting(false)
        }

        setIsSubmitting(false);
        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <select 
                name="clientId"
                required
                className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors cursor-pointer"
            >
                {clients.map((client) => (
                    <option key={client.id} value={client.id} className="text-foreground">
                        {client.companyName}
                    </option>
                ))}
            </select>

            <select 
                name="technicianId" 
                required
                className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors cursor-pointer"
            >

                {technicians.map((technician) => (
                    <option key={technician.id} value={technician.id} className="text-foreground">
                        {technician.firstName} {technician.lastName}
                    </option>
                ))}
            </select>

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