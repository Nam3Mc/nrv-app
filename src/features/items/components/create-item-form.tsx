"use client";

import { useState } from "react";

interface CreateItemFormProps {
    onSuccess: () => void;
}

const measurementUnits = ["UNIT", "KG", "LITER", "GRAM", "MILLILITER"];

export function CreateItemForm({ onSuccess }: CreateItemFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        const payload = {
            name: String(formData.get("name") ?? ""),
            lot: String(formData.get("lot") ?? ""),
            provider: String(formData.get("provider") ?? ""),
            serial: String(formData.get("serial") ?? "") || undefined,
            registrationNumber:
                String(formData.get("registrationNumber") ?? "") || undefined,
            expirationDate:
                String(formData.get("expirationDate") ?? "") || undefined,
            measurementUnit: String(formData.get("measurementUnit") ?? "UNIT"),
            quantity: Number(formData.get("quantity") ?? 0),
            price: Number(formData.get("price") ?? 0),
        };

        console.log("Create item payload:", payload);

        setIsSubmitting(false);
        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="mb-1 block text-sm font-semibold text-primary">
                    Nombre del ítem
                </label>
                <input
                    name="name"
                    required
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                        Lote
                    </label>
                    <input
                        name="lot"
                        required
                        className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                        Proveedor
                    </label>
                    <input
                        name="provider"
                        required
                        className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <input
                    name="serial"
                    placeholder="Serial"
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />

                <input
                    name="registrationNumber"
                    placeholder="Registro"
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <input
                    name="expirationDate"
                    type="date"
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />

                <select
                    name="measurementUnit"
                    required
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors cursor-pointer"
                >
                    {measurementUnits.map((unit) => (
                        <option key={unit} value={unit} className="text-foreground">
                            {unit}
                        </option>
                    ))}
                </select>

                <input
                    name="quantity"
                    type="number"
                    min="0"
                    required
                    placeholder="Cantidad"
                    className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
                />
            </div>

            <input
                name="price"
                type="number"
                min="0"
                required
                placeholder="Precio"
                className="w-full rounded-xl border border-border-subtle px-4 py-3 text-sm text-foreground bg-white outline-none focus:border-primary transition-colors"
            />

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-hover disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Guardando..." : "Crear ítem"}
                </button>
            </div>
        </form>
    );
}