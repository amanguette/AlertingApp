export interface ticket {
    id: number,
    title: string,
    description: string,
    // comments: comment[],
    createdAt: Date | null,
    updatedAt?: Date | null,
    status: string
}