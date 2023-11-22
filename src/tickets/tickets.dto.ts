// const comment = {
//     message: string,

// }

export class CreateTicketDto {
    id: number
    title: string
    description: string
    // comments: comment[]
    createdAt: Date | null
    updatedAt: Date | null
    status: string
}