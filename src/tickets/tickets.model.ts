import { AlertEntity } from 'src/alerts/alerts.entity'

// TODO - think about adding comments ?
export interface Ticket {
    id: number,
    title: string,
    description: string,
    createdAt: Date | null,
    updatedAt: Date | null,
    status: string,
    alerts?: AlertEntity[]
}