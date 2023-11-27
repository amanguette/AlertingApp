import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ticket } from './tickets.interface';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
    constructor(private ticketsService: TicketsService) {}
    
	@Post()
	async createOrUpdateTicket(@Body() data: ticket) {
		return this.ticketsService.createOrUpdate(data)
	}

	@Get()
	async getTickets() : Promise<ticket[]> {
		return await this.ticketsService.getTickets()
	}

	@Get(':id')
	async getTicket(@Param('id') id: number): Promise<ticket> {
		return await this.ticketsService.getTicket(id)
	}
}