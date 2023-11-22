import { Body, Controller, Post } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./tickets.dto";

@Controller('tickets')
export class TicketsController {
    constructor(private ticketsService: TicketsService) {}

    @Post()
    async create(@Body() createTicketDto: CreateTicketDto) {

    }
}