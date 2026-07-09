"use client";

import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

import { ApiError } from "@/core/types/api.types";
import { ExpiringCertificateItem } from "@/features/dashboard/components/expiring-certificate-item";
import { getExpiringCertificates } from "@/features/dashboard/services/expiring-certificates.service";
import type { ExpiringCertificateClient } from "@/features/dashboard/types/expiring-certificates.types";

export function ExpiringCertificatesCard() {
    const [clients, setClients] = useState<ExpiringCertificateClient[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadExpiringCertificates() {
        setIsLoading(true);
        setError(null);

        try {
            const response = await getExpiringCertificates();

            setClients(response.clients);
            setTotal(response.total);
        } catch (error) {
            if (error instanceof ApiError) {
                setError(error.message);
                return;
            }

            setError("No se pudieron cargar los certificados por vencer.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        async function load(){
            await void loadExpiringCertificates();
        }
        load()
    }, []);

    return (
        <section className="rounded-3xl border border-border-subtle/70 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-primary" />

                        <h2 className="text-lg font-bold text-primary">
                            Certificados por vencer
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-muted">
                        Clientes con próximo servicio en el mes actual.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={loadExpiringCertificates}
                    disabled={isLoading}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle text-primary transition hover:bg-surface-light disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Actualizar certificados por vencer"
                >
                    <RefreshCw
                        className={`h-4 w-4 ${
                            isLoading ? "animate-spin" : ""
                        }`}
                    />
                </button>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full border border-border-subtle bg-surface-light px-3 py-1 text-xs font-bold text-primary">
                    Mes en curso
                </span>

                <span className="text-xs font-bold text-muted">
                    {total} encontrados
                </span>
            </div>

            <div className="mt-5 space-y-3">
                {isLoading ? (
                    <div className="flex items-center justify-center rounded-2xl border border-border-subtle bg-surface-light py-10 text-sm text-muted">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Verificando clientes...
                    </div>
                ) : null}

                {!isLoading && error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-danger">
                        {error}
                    </div>
                ) : null}

                {!isLoading && !error && clients.length === 0 ? (
                    <div className="rounded-2xl border border-border-subtle bg-surface-light px-4 py-8 text-center">
                        <p className="text-sm font-bold text-primary">
                            No hay certificados por vencer este mes.
                        </p>

                        <p className="mt-1 text-xs text-muted">
                            Los clientes con próximo servicio aparecerán aquí.
                        </p>
                    </div>
                ) : null}

                {!isLoading && !error
                    ? clients.map((client) => (
                          <ExpiringCertificateItem
                              key={client.id}
                              client={client}
                          />
                      ))
                    : null}
            </div>
        </section>
    );
}