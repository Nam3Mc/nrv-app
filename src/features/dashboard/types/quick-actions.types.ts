export type QuickActionType = 
    | 'client'
    | 'service'
    | 'item'
    | 'technician'

export interface QuickActionOption {
    type: QuickActionType
    label: string 
    color: 'primary' | 'accent' | 'muted' | 'danger'
}