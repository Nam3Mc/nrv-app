"use client";

import { CalendarDays, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ApiError } from "@/core/types/api.types";
import {
    formatWeekRange,
    getServicesForDate,
    getWeekDays,
    toDateKey,
} from "@/features/dashboard/utils/calendar.utils";
import { WeekDaySelector } from "@/features/dashboard/components/week-day-selector";
import { WeeklyServiceItem } from "@/features/dashboard/components/weekly-service-item";
import { getServices } from "@/features/services/services/service.service";
import type { Service } from "@/features/services/types/service.types";

export function WeeklyServicesCard() {
    const [baseDate, setBaseDate] = useState(() => new Date());
    const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const weekDays = useMemo(() => getWeekDays(baseDate), [baseDate]);

    const selectedServices = useMemo(() => {
        return getServicesForDate(services, selectedDate);
    }, [services, selectedDate]);

    async function loadServices() {
        setIsLoading(true);
        setError(null);

        try {
            const data = await getServices();
            setServices(data);
        } catch (error) {
            if (error instanceof ApiError) {
                setError(error.message);
                return;
            }

            setError("No se pudieron cargar los servicios.");
        } finally {
            setIsLoading(false);
        }
    }

    function goToPreviousWeek() {
        setBaseDate((currentDate) => {
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() - 7);

            const newWeek = getWeekDays(nextDate);
            setSelectedDate(newWeek[0].isoDate);

            return nextDate;
        });
    }

    function goToNextWeek() {
        setBaseDate((currentDate) => {
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + 7);

            const newWeek = getWeekDays(nextDate);
            setSelectedDate(newWeek[0].isoDate);

            return nextDate;
        });
    }

    useEffect(() => {
        async function load() {

            await void loadServices();
        }
        load()
    }, []);

    return (
        <section className="rounded-3xl border border-border-subtle/70 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-primary" />

                        <h2 className="text-lg font-bold text-primary">
                            Servicios de esta semana
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-muted">
                        {formatWeekRange(weekDays)}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={goToPreviousWeek}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle text-primary transition hover:bg-surface-light"
                        aria-label="Semana anterior"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                        type="button"
                        onClick={goToNextWeek}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle text-primary transition hover:bg-surface-light"
                        aria-label="Semana siguiente"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="mt-5">
                <WeekDaySelector
                    days={weekDays}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                />
            </div>

            <div className="mt-5 space-y-3">
                {isLoading ? (
                    <div className="flex items-center justify-center rounded-2xl border border-border-subtle bg-surface-light py-10 text-muted">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Cargando servicios...
                    </div>
                ) : null}

                {!isLoading && error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-danger">
                        {error}
                    </div>
                ) : null}

                {!isLoading && !error && selectedServices.length === 0 ? (
                    <div className="rounded-2xl border border-border-subtle bg-surface-light px-4 py-8 text-center">
                        <p className="text-sm font-semibold text-primary">
                            No hay servicios para este día.
                        </p>

                        <p className="mt-1 text-xs text-muted">
                            Selecciona otro día o crea un nuevo servicio.
                        </p>
                    </div>
                ) : null}

                {!isLoading && !error
                    ? selectedServices.map((service) => (
                          <WeeklyServiceItem
                              key={service.id}
                              service={service}
                          />
                      ))
                    : null}
            </div>
        </section>
    );
}