import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketsController } from './tickets.controller';
import { Ticket } from './tickets.entity';
import { TicketsService } from './tickets.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Ticket])],
    controllers: [TicketsController],
    providers: [TicketsService],
})
export class ticketsModule {}
