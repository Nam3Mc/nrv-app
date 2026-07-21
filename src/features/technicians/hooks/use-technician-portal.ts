"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    completeService,
    getAssignedServices,
    getTechnicianStatistics,
    startService,
} from "../services/technician.service";

import type {
    TechnicianService,
    TechnicianStatistics,
} from "../types/technician-service.types";

export function useTechnicianPortal() {
    const router = useRouter();

    const [services, setServices] = useState<TechnicianService[]>([]);

    const [statistics, setStatistics] =
        useState<TechnicianStatistics>({
            totalServices: 0,
            scheduledServices: 0,
            completedServices: 0,
            canceledServices: 0,
            totalEarnings: 0,
            servicesByMonth: [],
    });

    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);

    const [selectedService, setSelectedService] =
        useState<TechnicianService | null>(null);

    async function loadPortal() {
        setLoading(true);

        try {
            const [servicesResponse, statisticsResponse] =
                await Promise.all([
                    getAssignedServices(),
                    getTechnicianStatistics(),
                ]);

            setServices(servicesResponse);

            setStatistics(statisticsResponse);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPortal();
    }, []);

    const handleStartClick = useCallback(
        (service: TechnicianService) => {
            setSelectedService(service);

            setModalOpen(true);
        },
        [],
    );

    const handleStartConfirm = useCallback(
        async (files: File[]) => {
            if (!selectedService) {
                return;
            }

            await startService(
                selectedService.id,
                files,
            );

            setModalOpen(false);

            await loadPortal();
        },
        [selectedService],
    );

    const handleComplete = useCallback(
        async (service: TechnicianService) => {
            await completeService(service.id);

            router.push(
                `/complete-service/${service.id}`,
            );
        },
        [router],
    );

    const handlePrintCertificate = useCallback(
        (service: TechnicianService) => {
            router.push(
                `/certificate/${service.id}`,
            );
        },
        [router],
    );

    return {
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

        reload: loadPortal,
    };
}