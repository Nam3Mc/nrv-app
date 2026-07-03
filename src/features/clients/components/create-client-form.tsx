"use client";

import { useState } from "react";

interface CreateClientFormProps {
    onSuccess: () => void;
}

export function CreateClientForm({ onSuccess }: CreateClientFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        const payload = {
            companyName: String(formData.get("companyName") ?? ""),
            address: String(formData.get("address") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            NIT: String(formData.get("NIT") ?? "") || undefined,
            email: String(formData.get("email") ?? "") || undefined,
            contactFirstName:
                String(formData.get("contactFirstName") ?? "") || undefined,
            contactLastName:
                String(formData.get("contactLastName") ?? "") || undefined,
        };

        console.log("Create client payload:", payload);

        setIsSubmitting(false);
        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="mb-1 block text-sm font-semibold text-primary">
                    Nombre de empresa
                </label>
                <input
                    name="companyName"
                    required
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-semibold text-primary">
                    Dirección
                </label>
                <input
                    name="address"
                    required
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                        Teléfono
                    </label>
                    <input
                        name="phone"
                        required
                        className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                        NIT
                    </label>
                    <input
                        name="NIT"
                        className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-semibold text-primary">
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                        Nombre del contacto
                    </label>
                    <input
                        name="contactFirstName"
                        className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                        Apellido del contacto
                    </label>
                    <input
                        name="contactLastName"
                        className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-hover disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Guardando..." : "Crear cliente"}
                </button>
            </div>
        </form>
    );
}