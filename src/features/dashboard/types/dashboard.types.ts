export type DashboardColor = 'primary' | 'accent' | 'muted' | 'danger'

export interface QuickAction {
    id: string
    label: string
    href: string
    color: DashboardColor
}

export interface 