'use client'

import { useState } from "react";
import { Client } from "../types/client.types";
import { updateClient } from "../services/client.service";
import { ApiError } from "@/core/types/api.types";

interface UpdateClientFormProps {
    client: Client
    onSuccess: () => void
    onClose: () => void
}

export function UpdateClientForm({client, onSuccess, onClose}: UpdateClientFormProps) {

    const [isUpdated, setIsUpdated] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        
        event.preventDefault()
        setIsUpdated(true)
        const formData = new FormData(event.currentTarget)
        const payload = {
            companyName: String(formData.get("companyName") ?? ""),
            address: String(formData.get("address") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            NIT: String(formData.get("NIT") ?? "") || undefined,
            email: String(formData.get("email") ?? "") || undefined,
            contactFirstName: String(formData.get("contactFirstName") ?? "") || undefined,
            contactLastName: String(formData.get("contactLastName") ?? "") || undefined,
        }

        try {
            await updateClient(client.id, payload);
            onSuccess();
        } catch (error) {
            if (error instanceof ApiError) {
                console.error(error.message);
                return;
            }
            console.error("Unexpected update client error");
        } finally {
            setIsUpdated(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="mb-1 block text-sm font-semibold text-primary">Nombre de empresa</label>
                <input
                    name="companyName"
                    required
                    defaultValue={client.companyName}
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-semibold text-primary">Dirección</label>
                <input
                    name="address"
                    required
                    defaultValue={client.address}
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">Teléfono</label>
                    <input
                        name="phone"
                        required
                        defaultValue={client.phone}
                        className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">NIT</label>
                    <input
                        name="NIT"
                        defaultValue={client.NIT}
                        className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-semibold text-primary">Email</label>
                <input
                    name="email"
                    type="email"
                    defaultValue={client.email}
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">Nombre del contacto</label>
                    <input
                        name="contactFirstName"
                        defaultValue={client.contactFirstName}
                        className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">Apellido del contacto</label>
                    <input
                        name="contactLastName"
                        defaultValue={client.contactLastName}
                        className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isUpdated}
                    className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-hover disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
                >
                    {isUpdated ? "Guardando..." : "Actualizar cliente"}
                </button>
            </div>
        </form>
    );

}