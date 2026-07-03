import { INTERNAL_API_ROUTES } from "@/core/constants/internal-api-routes";
import { clientApiClient } from "@/core/lib/client-api-client";
import type {
    Client,
    CreateClientRequest,
} from "@/features/clients/types/client.types";

export async function getClients(): Promise<Client[]> {
    return clientApiClient<Client[]>(INTERNAL_API_ROUTES.clients.base, {
        method: "GET",
    });
}

export async function createClient(
    payload: CreateClientRequest,
): Promise<Client> {
    return clientApiClient<Client>(INTERNAL_API_ROUTES.clients.base, {
        method: "POST",
        body: payload,
    });
}