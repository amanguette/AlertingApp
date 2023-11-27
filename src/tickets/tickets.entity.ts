import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
	@PrimaryGeneratedColumn()
    id: number

	@Column('varchar', { name: 'title', length: 128 })
    title: string

	@Column('varchar', { name: 'description', length: 256 })
	description: string

	@Column('timestamptz', { name: 'created_at' })
	createdAt: Date | null

	@Column('timestamptz', { name: 'updated_at', nullable: true })
	updatedAt: Date | null

	@Column('varchar', { name: 'status', length: 45 })
	status: string
}
