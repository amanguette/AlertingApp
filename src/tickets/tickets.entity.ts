import { AlertEntity } from 'src/alerts/alerts.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tickets' })
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

	@ManyToMany(() => AlertEntity, alert => alert.tickets)
	@JoinTable()
	alerts: AlertEntity[]
}
