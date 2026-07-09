import type { Client } from "@/features/clients/types/client.types";

export interface ExpiringClientAlert {
    id: string;
    companyName: string;
    nextServiceDate: string;
    daysLeft: number;
    address?: string | null;
    phone?: string | null;
}

function getStartOfCurrentMonth(): Date {
    const today = new Date();

    return new Date(today.getFullYear(), today.getMonth(), 1);
}

function getEndOfCurrentMonth(): Date {
    const today = new Date();

    return new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
}

function normalizeDate(date: Date): Date {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    return normalizedDate;
}

export function getDaysUntil(date: string): number {
    const today = normalizeDate(new Date());
    const targetDate = normalizeDate(new Date(date));

    const differenceInMilliseconds = targetDate.getTime() - today.getTime();

    return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
}

export function isDateInCurrentMonth(date: string): boolean {
    const targetDate = new Date(date);
    const startOfMonth = getStartOfCurrentMonth();
    const endOfMonth = getEndOfCurrentMonth();

    return targetDate >= startOfMonth && targetDate <= endOfMonth;
}

export function getClientsWithNextServiceThisMonth(
    clients: Client[],
): ExpiringClientAlert[] {
    return clients
        .filter((client) => {
            if (!client.nextServiceDate) {
                return false;
            }

            return isDateInCurrentMonth(client.nextServiceDate);
        })
        .map((client) => ({
            id: client.id,
            companyName: client.companyName,
            nextServiceDate: client.nextServiceDate as string,
            daysLeft: getDaysUntil(client.nextServiceDate as string),
            address: client.address,
            phone: client.phone,
        }))
        .sort((a, b) => {
            return (
                new Date(a.nextServiceDate).getTime() -
                new Date(b.nextServiceDate).getTime()
            );
        });
}

export function formatNextServiceDate(date: string): string {
    return new Intl.DateTimeFormat("es-CO", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

export function getDaysLeftLabel(daysLeft: number): string {
    if (daysLeft < 0) {
        return "Vencido";
    }

    if (daysLeft === 0) {
        return "Hoy";
    }

    if (daysLeft === 1) {
        return "Mañana";
    }

    return `En ${daysLeft} días`;
}