"use client";

import { useEffect, useState } from "react";

import { ApiError } from "@/core/types/api.types";
import {
    activateClient,
    deactivateClient,
    getClient,
    getClients,
    updateClient,
} from "@/features/clients/services/client.service";
import type { Client } from "@/features/clients/types/client.types";
import { DashboardEntitySection } from "@/features/dashboard/components/dashboard-entity-section";
import { getItems, updateItem } from "@/features/items/services/item.service";
import type { Item } from "@/features/items/types/item.types";
import {
    getServices,
    updateService,
} from "@/features/services/services/service.service";
import type { Service } from "@/features/services/types/service.types";
import {
    getTechnicians,
    updateTechnician,
} from "@/features/technicians/services/technician.service";
import type { Technician } from "@/features/technicians/types/technician.types";

type DashboardListKey = "clients" | "services" | "items" | "technicians";

type DashboardListErrors = Record<DashboardListKey, string | null>;

const defaultErrors: DashboardListErrors = {
    clients: null,
    services: null,
    items: null,
    technicians: null,
};

function getErrorMessage(error: unknown, fallbackMessage: string): string {
    if (error instanceof ApiError) {
        return error.message;
    }
    return fallbackMessage;
}

export function DashboardBottomLists() {
    const [clients, setClients] = useState<Client[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [technicians, setTechnicians] = useState<Technician[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState<DashboardListErrors>(defaultErrors);

    function setListError(key: DashboardListKey, message: string | null) {
        setErrors((currentErrors) => ({
            ...currentErrors,
            [key]: message,
        }));
    }

    async function loadDashboardLists() {
        setIsLoading(true);
        setErrors(defaultErrors);

        const [
            clientsResult,
            servicesResult,
            itemsResult,
            techniciansResult,
        ] = await Promise.allSettled([
            getClients(),
            getServices(),
            getItems(),
            getTechnicians(),
        ]);

        if (clientsResult.status === "fulfilled") {
            setClients(clientsResult.value);
        } else {
            setListError(
                "clients",
                getErrorMessage(
                    clientsResult.reason,
                    "No se pudieron cargar los clientes.",
                ),
            );
        }

        if (servicesResult.status === "fulfilled") {
            setServices(servicesResult.value);
        } else {
            setListError(
                "services",
                getErrorMessage(
                    servicesResult.reason,
                    "No se pudieron cargar los servicios.",
                ),
            );
        }

        if (itemsResult.status === "fulfilled") {
            setItems(itemsResult.value);
        } else {
            setListError(
                "items",
                getErrorMessage(
                    itemsResult.reason,
                    "No se pudieron cargar los ítems.",
                ),
            );
        }

        if (techniciansResult.status === "fulfilled") {
            setTechnicians(techniciansResult.value);
        } else {
            setListError(
                "technicians",
                getErrorMessage(
                    techniciansResult.reason,
                    "No se pudieron cargar los técnicos.",
                ),
            );
        }

        setIsLoading(false);
    }

    useEffect(() => {
        void loadDashboardLists();
    }, []);

    async function handleToggleClient(client: Client) {
        setListError("clients", null);
        try {

            const updatedClient = await getClient(client.id)
            if ( !updatedClient.isActive) {
                await activateClient(client.id)
            } else {

                await deactivateClient(client.id) 
            }

            setClients((currentClients) =>
                currentClients.map((item) =>
                    item.id === updatedClient.id ? updatedClient : item,
                ),
            );
        } catch (error) {
            setListError(
                "clients",
                getErrorMessage(error, "No se pudo actualizar el cliente."),
            );
        }
    }

    async function handleToggleItem(item: Item) {
        setListError("items", null);

        try {
            const updatedItem = await updateItem(item.id, {
                isActive: !item.isActive,
            });

            setItems((currentItems) =>
                currentItems.map((currentItem) =>
                    currentItem.id === updatedItem.id
                        ? updatedItem
                        : currentItem,
                ),
            );
        } catch (error) {
            setListError(
                "items",
                getErrorMessage(error, "No se pudo actualizar el ítem."),
            );
        }
    }

    async function handleToggleTechnician(technician: Technician) {
        setListError("technicians", null);

        try {
            const updatedTechnician = await updateTechnician(technician.id, {
                isActive: !technician.isActive,
            });

            setTechnicians((currentTechnicians) =>
                currentTechnicians.map((item) =>
                    item.id === updatedTechnician.id
                        ? updatedTechnician
                        : item,
                ),
            );
        } catch (error) {
            setListError(
                "technicians",
                getErrorMessage(error, "No se pudo actualizar el técnico."),
            );
        }
    }

    async function handleToggleServiceStatus(service: Service) {
        if (service.status === "COMPLETED") {
            return;
        }

        setListError("services", null);

        const nextStatus =
            service.status === "CANCELED" ? "SCHEDULED" : "CANCELED";

        try {
            const updatedService = await updateService(service.id, {
                status: nextStatus,
            });

            setServices((currentServices) =>
                currentServices.map((item) =>
                    item.id === updatedService.id ? updatedService : item,
                ),
            );
        } catch (error) {
            setListError(
                "services",
                getErrorMessage(error, "No se pudo actualizar el servicio."),
            );
        }
    }

    return (
        <section className="mt-6 space-y-5">
            <DashboardEntitySection
                title="Clientes"
                count={clients.length}
                items={clients}
                isLoading={isLoading}
                error={errors.clients}
                searchPlaceholder="Buscar cliente..."
                getId={(client) => client.id}
                getSearchValue={(client) =>
                    `${client.companyName} ${client.phone} ${
                        client.email ?? ""
                    } ${client.NIT ?? ""}`
                }
                renderTitle={(client) => client.companyName}
                renderSubtitle={(client) => client.address}
                renderMeta={(client) => client.phone}
                getIsActive={(client) => Boolean(client.isActive)}
                getToggleLabel={(client) =>
                    client.isActive ? "Desactivar cliente" : "Activar cliente"
                }
                onToggleActive={handleToggleClient}
                onEdit={(client) => {
                    console.log("Edit client:", client);
                }}
            />

            <DashboardEntitySection
                title="Servicios"
                count={services.length}
                items={services}
                isLoading={isLoading}
                error={errors.services}
                searchPlaceholder="Buscar servicio..."
                getId={(service) => service.id}
                getSearchValue={(service) =>
                    `${service.client?.companyName ?? ""} ${service.status} ${
                        service.notes ?? ""
                    }`
                }
                renderTitle={(service) =>
                    service.client?.companyName ?? "Servicio sin cliente"
                }
                renderSubtitle={(service) =>
                    new Intl.DateTimeFormat("es-CO", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    }).format(new Date(service.scheduledAt))
                }
                renderMeta={(service) =>
                    `Precio: $${Number(service.servicePrice).toLocaleString(
                        "es-CO",
                    )}`
                }
                renderStatusLabel={(service) => service.status}
                getIsActive={(service) => service.status !== "CANCELED"}
                getToggleLabel={(service) => {
                    if (service.status === "COMPLETED") {
                        return "No se puede cancelar un servicio completado";
                    }

                    return service.status === "CANCELED"
                        ? "Reactivar servicio"
                        : "Cancelar servicio";
                }}
                getToggleDisabled={(service) => service.status === "COMPLETED"}
                onToggleActive={handleToggleServiceStatus}
                onEdit={(service) => {
                    console.log("Edit service:", service);
                }}
            />

            <DashboardEntitySection
                title="Ítems"
                count={items.length}
                items={items}
                isLoading={isLoading}
                error={errors.items}
                searchPlaceholder="Buscar ítem..."
                getId={(item) => item.id}
                getSearchValue={(item) =>
                    `${item.name} ${item.lot} ${item.provider}`
                }
                renderTitle={(item) => item.name}
                renderSubtitle={(item) => `${item.provider} · Lote ${item.lot}`}
                renderMeta={(item) =>
                    `Cantidad: ${item.quantity} · Precio: $${Number(
                        item.price,
                    ).toLocaleString("es-CO")}`
                }
                getIsActive={(item) => Boolean(item.isActive)}
                getToggleLabel={(item) =>
                    item.isActive ? "Desactivar ítem" : "Activar ítem"
                }
                onToggleActive={handleToggleItem}
                onEdit={(item) => {
                    console.log("Edit item:", item);
                }}
            />

            <DashboardEntitySection
                title="Técnicos"
                count={technicians.length}
                items={technicians}
                isLoading={isLoading}
                error={errors.technicians}
                searchPlaceholder="Buscar técnico..."
                getId={(technician) => technician.id}
                getSearchValue={(technician) =>
                    `${technician.firstName} ${technician.lastName} ${
                        technician.email
                    } ${technician.phone ?? ""}`
                }
                renderTitle={(technician) =>
                    `${technician.firstName} ${technician.lastName}`
                }
                renderSubtitle={(technician) => technician.email}
                renderMeta={(technician) => technician.phone ?? "Sin teléfono"}
                getIsActive={(technician) => Boolean(technician.isActive)}
                getToggleLabel={(technician) =>
                    technician.isActive
                        ? "Desactivar técnico"
                        : "Activar técnico"
                }
                onToggleActive={handleToggleTechnician}
                onEdit={(technician) => {
                    console.log("Edit technician:", technician);
                }}
            />
        </section>
    );
}