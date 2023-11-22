import { Global, Module } from "@nestjs/common";
import { TicketsController } from "./tickets.controller";
import { TicketsService } from "./tickets.service";

@Global()
@Module({
    // imports
    controllers: [TicketsController],
    providers: [TicketsService],
})
export class ticketsModule {
//   constructor(private alertsService: AlertsService) {}
}