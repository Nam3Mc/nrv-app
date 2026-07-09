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

export async function getClient( clientId: string): Promise<Client> {
    return clientApiClient<Client>(INTERNAL_API_ROUTES.clients.byId(clientId), {
        method: "GET"
    })
}

export async function updateClient(
    clientId: string,
    payload: Partial<CreateClientRequest>
): Promise<Client> {
    return clientApiClient<Client>(
        INTERNAL_API_ROUTES.clients.update(clientId),
        {
            method: "PATCH",
            body: payload,
        },
    );
}

export async function deactivateClient(
    clientId: string,
): Promise<Client> {
    return clientApiClient<Client>(
        INTERNAL_API_ROUTES.clients.deactivate(clientId),
        {
            method: "PATCH",
        },
    );
}

export async function activateClient(
    clientId: string,
): Promise<Client> {
    return clientApiClient<Client>(
        INTERNAL_API_ROUTES.clients.activate(clientId),
        {
            method: "PATCH",
        },
    );
}