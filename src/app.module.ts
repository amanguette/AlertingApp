import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { alertsModule } from './alerts/alerts.module';
import { Alert } from './alerts/alerts.entity';

import { ticketsModule } from './tickets/tickets.module';
import { Ticket } from './tickets/tickets.entity';

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
      entities: [Alert, Ticket],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
