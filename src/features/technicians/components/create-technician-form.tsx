"use client";

import { useState } from "react";

interface CreateTechnicianFormProps {
    onSuccess: () => void;
}

export function CreateTechnicianForm({ onSuccess }: CreateTechnicianFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        const payload = {
            firstName: String(formData.get("firstName") ?? ""),
            lastName: String(formData.get("lastName") ?? ""),
            email: String(formData.get("email") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            documentNumber: String(formData.get("documentNumber") ?? ""),
            password: String(formData.get("password") ?? ""),
            role: "TECHNICIAN",
        };

        console.log("Create technician payload:", payload);

        setIsSubmitting(false);
        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <input
                    name="firstName"
                    required
                    placeholder="Nombre"
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />

                <input
                    name="lastName"
                    required
                    placeholder="Apellido"
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />
            </div>

            <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <input
                    name="phone"
                    required
                    placeholder="+573001112233"
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />

                <input
                    name="documentNumber"
                    required
                    placeholder="Documento"
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />
            </div>

            <input
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="Contraseña temporal"
                className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
            />

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-hover disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Guardando..." : "Crear técnico"}
                </button>
            </div>
        </form>
    );
}