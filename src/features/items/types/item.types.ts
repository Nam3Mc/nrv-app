export type MeasurementUnit =
    | "UNIT"
    | "KG"
    | "LITER"

export interface CreateItemRequest {
    name: string;
    lot: string;
    provider: string;
    serial?: string;
    registrationNumber?: string;
    expirationDate?: string;
    measurementUnit: MeasurementUnit | string;
    quantity: number;
    price: number;
}

export interface Item {
    id: string;
    name: string;
    lot: string;
    provider: string;
    serial?: string | null;
    registrationNumber?: string | null;
    expirationDate?: string | null;
    measurementUnit: string;
    quantity: number;
    price: number;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}