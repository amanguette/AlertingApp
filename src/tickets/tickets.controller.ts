import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { Ticket } from './tickets.model'
import { TicketsService } from './tickets.service'

@Controller('tickets')
export class TicketsController {
    constructor(private ticketsService: TicketsService) {}
    
	// TODO - think to split add/edit to get different payloads ?
	@Post()
	async createOrUpdateTicket(@Body() data: Ticket) {
		return this.ticketsService.createOrUpdate(data)
	}

	@Get()
	async getTickets() : Promise<Ticket[]> {
		return await this.ticketsService.getTickets()
	}

	@Get(':id')
	async getTicket(@Param('id') id: number): Promise<Ticket> {
		return await this.ticketsService.getTicket(id)
	}
}