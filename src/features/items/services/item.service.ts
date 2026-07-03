import { INTERNAL_API_ROUTES } from "@/core/constants/internal-api-routes";
import { clientApiClient } from "@/core/lib/client-api-client";
import type {
    CreateItemRequest,
    Item,
} from "@/features/items/types/item.types";

export async function getItems(): Promise<Item[]> {
    return clientApiClient<Item[]>(INTERNAL_API_ROUTES.items.base, {
        method: "GET",
    });
}

export async function createItem(payload: CreateItemRequest): Promise<Item> {
    return clientApiClient<Item>(INTERNAL_API_ROUTES.items.base, {
        method: "POST",
        body: payload,
    });
}