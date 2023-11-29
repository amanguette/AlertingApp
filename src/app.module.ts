import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AlertEntity } from './alerts/alerts.entity'
import { alertsModule } from './alerts/alerts.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Ticket } from './tickets/tickets.entity'
import { ticketsModule } from './tickets/tickets.module'

@Module({
  imports: [
    alertsModule,
    ticketsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'alerting',
      entities: [AlertEntity, Ticket],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
