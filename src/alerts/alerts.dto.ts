export class CreateAlertDto {
    id: number
    originUrl: string
    eventId: string
    description: string
    createdAt: Date | null
    updatedAt: Date | null
    resolvedAt: Date | null
    acknowledge: string | null
}

// TODO: add validation pipes ?
// https://docs.nestjs.com/pipes#class-validator
