import { Ticket } from 'src/tickets/tickets.entity'

export interface Alert {
    id: number,
    originUrl: string,
    eventId: string,
    description?: string,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    resolvedAt?: Date | null,
    acknowledge?: string | null,
    alertStatus?: string | null,
    tickets?: Ticket[]
}
