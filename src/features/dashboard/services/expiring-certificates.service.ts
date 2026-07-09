import { INTERNAL_API_ROUTES } from "@/core/constants/internal-api-routes";
import { clientApiClient } from "@/core/lib/client-api-client";
import type { ExpiringCertificatesResponse } from "@/features/dashboard/types/expiring-certificates.types";

export async function getExpiringCertificates(): Promise<ExpiringCertificatesResponse> {
    return clientApiClient<ExpiringCertificatesResponse>(
        INTERNAL_API_ROUTES.dashboard.expiringCertificates,
        {
            method: "GET",
        },
    );
}