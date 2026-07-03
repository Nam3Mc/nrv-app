import { LucideIcon } from "lucide-react"
import { DashboardColor } from "../types/dashboard.types"

interface QuickActionButtonProps {
    label: string
    color: DashboardColor
    icon: LucideIcon
    onClick: () => void
}

const colorClasses: Record<DashboardColor, {wrapper: string, hover: string}> = {
    primary: {
        wrapper: "bg-primary/10 text-primary",
        hover: "hover:border-primary/20 hover:bg-surface-light/40",
    },
    accent: {
        wrapper: "bg-accent/10 text-accent-hover", // Usamos el hover para que el icono tenga mejor contraste de lectura
        hover: "hover:border-accent/20 hover:bg-surface-light/40",
    },
    muted: {
        wrapper: "bg-muted/10 text-muted",
        hover: "hover:border-muted/20 hover:bg-surface-light/40",
    },
    danger: {
        wrapper: "bg-danger/10 text-danger",
        hover: "hover:border-danger/20 hover:bg-danger/5",
    },
}

export function QuicActionsButton({label, color, icon: Icon, onClick, }: QuickActionButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex min-h-36 flex-col items-center justify-center rounded-2xl border border-border-subtle bg-white px-4 py-5 text-center shadow-sm transition-all duration-200 ${colorClasses[color].hover}`}
        >
            <span className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-colors ${colorClasses[color].wrapper}`}>
                <Icon className="h-8 w-8" />
            </span>
            <span className="mt-4 text-sm font-bold leading-5 text-primary">
                {label}
            </span>
        </button>
    )
}