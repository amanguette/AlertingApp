import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlertsController } from './alerts.controller';
import { Alert } from './alerts.entity';
import { AlertsService } from './alerts.service';

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([Alert])],
	controllers: [AlertsController],
	providers: [AlertsService],
	// exports: [AlertsService]
	// exports: [TypeOrmModule]
})
export class alertsModule {
	// constructor(private alertsService: AlertsService) {}
}
