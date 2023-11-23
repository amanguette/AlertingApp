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
		return this.TicketsRepository.findOne({ where: { id } });
	}
}