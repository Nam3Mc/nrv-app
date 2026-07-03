'use client'

import { Box, User, UserPlus, Wrench } from "lucide-react";
import { useState } from "react";
import { QuickActionType } from "../types/quick-actions.types";
import { QuicActionsButton } from "./quick-action-button";
import { QuickActionModal } from "./quick-action-modal";

const quickActions = [
    {
        type: 'client' as const,
        label: 'Nuevo Cliente',
        color: 'primary' as const,
        icons: User,
    },
    {
        type: 'service' as const,
        label: 'Nuevo Servicio',
        color: 'accent' as const,
        icons: Wrench,
    },
    {
        type: 'item' as const,
        label: 'Nuevo Item',
        color: 'muted' as const,
        icons: Box,
    },
    {
        type: 'technician' as const,
        label: 'Nuevo Tecnico',
        color: 'danger' as const,
        icons: UserPlus,
    },
]


export function QuickActionsCar() {
    const [selectedAction, setSelectedAction] = useState<QuickActionType | null>(null) 

    function closeModal() {
        setSelectedAction(null)
    }

    return (
        <>
            <section className="rounded-3xl border border-border-subtle/70 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-primary">
                    Acciones Rapidas

                </h2>
                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-3">
                    {quickActions.map((action) => (
                        <QuicActionsButton
                            key={action.type}
                            label={action.label}
                            color={action.color}
                            icon={action.icons}
                            onClick={() => setSelectedAction(action.type)}
                        />
                        ))}
                </div>
            </section>

            <QuickActionModal
                actionType={selectedAction}
                isOpen={Boolean(selectedAction)}
                onClose={closeModal}
            />
        </>
    )
}