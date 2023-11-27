import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Ticket } from './tickets.entity';

@Injectable()
	export class TicketsService {
	constructor(
		@InjectRepository(Ticket)
		private readonly TicketsRepository: Repository<Ticket>,
	) {}

	getTickets(): Promise<Ticket[]> {
		return this.TicketsRepository.find()
	}

	getTicket(id: number): Promise<Ticket> {
		return this.TicketsRepository.findOne({ where: { id } })
	}
	
	async createOrUpdate(data: Partial<Ticket>): Promise<Ticket> {
		const { id,  } = data;
		let ticket = await this.TicketsRepository.findOne({where: {id}})
		if (!ticket) {
		  ticket = new Ticket()
		  ticket.createdAt = new Date()
		  ticket.status = 'triggered'
		}
		Object.assign(ticket, data)
		ticket.updatedAt = new Date()
		ticket.id = id
		return this.TicketsRepository.save(ticket)
	}
}
