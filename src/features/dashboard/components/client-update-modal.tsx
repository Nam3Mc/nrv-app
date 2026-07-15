"use client";

import type { Client } from "@/features/clients/types/client.types";
import { UpdateClientForm } from "@/features/clients/components/update-client-form";

interface UpdateClientModalProps {
    client: Client
    onClose: () => void;
    onSuccess: () => void;
}

export function UpdateClientModal({ client, onClose, onSuccess }: UpdateClientModalProps) {
    if (!client) return <div> Not Client was Provided </div>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground">Editar Cliente</h3>
                    <button 
                        type="button"
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground text-sm cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
                
                <UpdateClientForm 
                    client={client}
                    onSuccess={onSuccess}
                    onClose={onClose}
                />
            </div>
        </div>
    );
}