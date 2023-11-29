import { Ticket } from 'src/tickets/tickets.entity';
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'alerts' })
@Index(['originUrl','eventId'], { unique: true })
export class AlertEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column('varchar', { name: 'origin_url', length: 128 })
	originUrl: string

	@Column('varchar', { name: 'event_id', length: 128 })
	eventId: string

	@Column('varchar', { name: 'description', length: 256 })
	description: string

	@Column('timestamptz', { name: 'created_at' })
	createdAt: Date | null

	@Column('timestamptz', { name: 'updated_at', nullable: true })
	updatedAt: Date | null

	@Column('timestamptz', { name: 'resolved_at', nullable: true })
	resolvedAt: Date | null

	@Column('varchar', { name: 'acknowledge', length: 45, nullable: true })
	acknowledge: string | null
	// renvoie 'prenom.nom'

	@ManyToMany(() => Ticket, ticket => ticket.alerts)
	@JoinTable()
	tickets: Ticket[]
}
