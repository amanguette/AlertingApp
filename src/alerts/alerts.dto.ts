// import { IsInt, IsString } from "class-validator"

// https://docs.nestjs.com/pipes#class-validator
export class CreateAlertDto {
    // @IsInt()
    id: number

    // @IsString()
    originUrl: string

    // @IsString()
    eventId: string

    // @IsString()
    description: string

    createdAt: Date | null
    updatedAt: Date | null
    resolvedAt: Date | null
    acknowledge: string | null
}

