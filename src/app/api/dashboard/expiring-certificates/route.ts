import { NextResponse } from "next/server";

import { API_ROUTES } from "@/core/constants/api-routes";
import { routeErrorResponse } from "@/core/lib/route-error-response";
import { serverApiClient } from "@/core/lib/server-api-client";
import type { Client } from "@/features/clients/types/client.types";
import type {
    ExpiringCertificateClient,
    ExpiringCertificatesResponse,
} from "@/features/dashboard/types/expiring-certificates.types";

function normalizeDate(date: Date): Date {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    return normalizedDate;
}

function getDaysUntil(date: string): number {
    const today = normalizeDate(new Date());
    const targetDate = normalizeDate(new Date(date));

    const differenceInMilliseconds = targetDate.getTime() - today.getTime();

    return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
}

function isDateInCurrentMonth(date: string): boolean {
    const today = new Date();
    const targetDate = new Date(date);

    return (
        targetDate.getFullYear() === today.getFullYear() &&
        targetDate.getMonth() === today.getMonth()
    );
}

function getCurrentMonthClients(clients: Client[]): ExpiringCertificateClient[] {
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

export async function GET() {
    try {
        const clients = await serverApiClient<Client[]>(
            API_ROUTES.clients.base,
            {
                method: "GET",
            },
        );

        const expiringClients = getCurrentMonthClients(clients);
        const today = new Date();

        const response: ExpiringCertificatesResponse = {
            clients: expiringClients,
            total: expiringClients.length,
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        };

        return NextResponse.json(response, {
            status: 200,
        });
    } catch (error) {
        return routeErrorResponse(error);
    }
}