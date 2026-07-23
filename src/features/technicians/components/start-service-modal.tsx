"use client";

import Image from "next/image";
import { ImagePlus, Loader2, Trash2, X } from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

import type { TechnicianService } from "../types/technician-service.types";

interface StartServiceModalProps {
    open: boolean;
    service: TechnicianService | null;
    loading?: boolean;
    onClose: () => void;
    onConfirm: (files: File[]) => Promise<void>;
}

interface PreviewFile {
    file: File;
    preview: string;
}

export function StartServiceModal({
    open,
    service,
    loading = false,
    onClose,
    onConfirm,
}: StartServiceModalProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const isLoading = loading || submitting;

    useEffect(() => {
        if (!open) {
            setFiles([]);
            setSubmitting(false);
        }
    }, [open]);

    const previews = useMemo<PreviewFile[]>(
        () =>
            files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            })),
        [files],
    );

    useEffect(() => {
        return () => {
            previews.forEach((preview) =>
                URL.revokeObjectURL(preview.preview),
            );
        };
    }, [previews]);

    if (!open || !service) return null;

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        if (!event.target.files || isLoading) return;

        const selected = Array.from(event.target.files);

        setFiles((previous) => [...previous, ...selected]);

        event.target.value = "";
    };

    const removeFile = (index: number) => {
        if (isLoading) return;

        setFiles((previous) =>
            previous.filter((_, currentIndex) => currentIndex !== index),
        );
    };

    const handleConfirm = async () => {
        if (isLoading || files.length === 0) return;

        setSubmitting(true);

        try {
            await onConfirm(files);

            setFiles([]);

            onClose();
        } catch {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 backdrop-blur-sm sm:p-6">
            <div className="flex max-h-[98vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[95vh]">
                {/* Header */}
                <header className="flex flex-col items-start gap-2 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                            Iniciar servicio
                        </h2>

                        <p className="mt-0.5 text-sm text-slate-500 sm:mt-1">
                            Confirma tu llegada y registra las fotografías del
                            estado inicial.
                        </p>
                    </div>

                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={onClose}
                        className="rounded-lg p-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Cerrar"
                    >
                        <X size={22} />
                    </button>
                </header>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-8 sm:py-6">
                    <div className="space-y-6 sm:space-y-8">
                        {/* Info */}
                        <section className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2 sm:gap-5 sm:p-6">
                            <InfoRow
                                label="Empresa"
                                value={service.client.companyName}
                            />

                            <InfoRow
                                label="Contacto"
                                value={
                                    service.client.contactFirstName || "-"
                                }
                            />

                            <InfoRow
                                label="Dirección"
                                value={service.client.address}
                            />

                            <InfoRow
                                label="Teléfono"
                                value={service.client.phone}
                            />

                            <InfoRow
                                label="Fecha"
                                value={new Date(
                                    service.scheduledAt,
                                ).toLocaleString("es-CO")}
                            />

                            <InfoRow
                                label="Estado"
                                value={service.status}
                            />
                        </section>

                        {/* Images */}
                        <section className="space-y-3 sm:space-y-4">
                            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        Fotografías BEFORE
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        Captura el estado inicial antes de
                                        comenzar el trabajo.
                                    </p>
                                </div>

                                <span className="rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-700 sm:px-4 sm:py-1">
                                    {files.length} fotografía
                                    {files.length !== 1 && "s"}
                                </span>
                            </div>

                            <label
                                htmlFor="before-images"
                                className={`flex min-h-[180px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition sm:min-h-[200px] sm:p-6 ${
                                    isLoading
                                        ? "cursor-not-allowed border-slate-200 bg-slate-100 opacity-60"
                                        : "cursor-pointer border-slate-300 hover:border-green-700 hover:bg-green-50"
                                }`}
                            >
                                <ImagePlus
                                    size={40}
                                    className="mb-2 text-green-700 sm:mb-3 sm:size-12"
                                />

                                <p className="font-semibold text-slate-900">
                                    Haz clic para agregar fotografías
                                </p>

                                <p className="mt-1 text-xs text-slate-500 sm:mt-2 sm:text-sm">
                                    JPG, PNG o WEBP
                                </p>
                            </label>

                            <input
                                id="before-images"
                                hidden
                                multiple
                                accept="image/*"
                                type="file"
                                disabled={isLoading}
                                onChange={handleFileChange}
                            />

                            {previews.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-slate-300 py-8 text-center text-sm text-slate-500 sm:py-10">
                                    No has seleccionado fotografías.
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
                                    {previews.map(
                                        ({ file, preview }, index) => (
                                            <article
                                                key={`${file.name}-${index}`}
                                                className="overflow-hidden rounded-xl border border-slate-200"
                                            >
                                                <div className="relative aspect-square">
                                                    <Image
                                                        src={preview}
                                                        alt={file.name}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />

                                                    <button
                                                        type="button"
                                                        disabled={isLoading}
                                                        onClick={() =>
                                                            removeFile(index)
                                                        }
                                                        className="absolute right-1.5 top-1.5 rounded-full bg-red-600 p-1.5 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:right-2 sm:top-2 sm:p-2"
                                                        aria-label="Eliminar imagen"
                                                    >
                                                        <Trash2
                                                            size={14}
                                                            className="sm:size-4"
                                                        />
                                                    </button>
                                                </div>

                                                <div className="truncate border-t p-1.5 text-xs text-slate-600 sm:p-2">
                                                    {file.name}
                                                </div>
                                            </article>
                                        ),
                                    )}
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                {/* Footer */}
                <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:px-8 sm:py-6">
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={onClose}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-6 sm:py-2"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        disabled={files.length === 0 || isLoading}
                        onClick={handleConfirm}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-6 sm:py-2"
                    >
                        {isLoading && (
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                        )}

                        {isLoading
                            ? "Subiendo fotografías..."
                            : "Iniciar servicio"}
                    </button>
                </footer>
            </div>
        </div>
    );
}

interface InfoRowProps {
    label: string;
    value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
    return (
        <div>
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
                {label}
            </p>

            <p className="mt-0.5 font-medium text-slate-900 sm:mt-1">
                {value}
            </p>
        </div>
    );
}