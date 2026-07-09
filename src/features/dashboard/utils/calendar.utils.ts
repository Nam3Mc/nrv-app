import type { Service } from "@/features/services/types/service.types";

export interface WeekDay {
    id: string;
    label: string;
    dayNumber: number;
    date: Date;
    isoDate: string;
    isToday: boolean;
}

const dayLabels = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

export function getStartOfWeek(date: Date): Date {
    const currentDate = new Date(date);
    const day = currentDate.getDay();

    const diff = day === 0 ? -6 : 1 - day;

    currentDate.setDate(currentDate.getDate() + diff);
    currentDate.setHours(0, 0, 0, 0);

    return currentDate;
}

export function getWeekDays(baseDate = new Date()): WeekDay[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfWeek = getStartOfWeek(baseDate);

    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + index);

        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);

        return {
            id: date.toISOString(),
            label: dayLabels[date.getDay()],
            dayNumber: date.getDate(),
            date,
            isoDate: toDateKey(date),
            isToday: normalizedDate.getTime() === today.getTime(),
        };
    });
}

export function toDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function getServiceDateKey(service: Service): string {
    return toDateKey(new Date(service.scheduledAt));
}

export function getServicesForDate(
    services: Service[],
    isoDate: string,
): Service[] {
    return services
        .filter((service) => getServiceDateKey(service) === isoDate)
        .sort((a, b) => {
            return (
                new Date(a.scheduledAt).getTime() -
                new Date(b.scheduledAt).getTime()
            );
        });
}

export function formatServiceTime(scheduledAt: string): string {
    return new Intl.DateTimeFormat("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date(scheduledAt));
}

export function formatWeekRange(days: WeekDay[]): string {
    const firstDay = days[0]?.date;
    const lastDay = days[days.length - 1]?.date;

    if (!firstDay || !lastDay) {
        return "";
    }

    const formatter = new Intl.DateTimeFormat("es-CO", {
        day: "numeric",
        month: "short",
    });

    return `${formatter.format(firstDay)} - ${formatter.format(lastDay)}`;
}