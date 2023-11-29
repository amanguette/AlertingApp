import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Alert } from './alerts.model';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
	constructor(private alertsService: AlertsService) {}

	@Post()
	async createOrUpdateAlert(@Body() data: Alert) {
		return this.alertsService.createOrUpdate(data)
	}

	@Get()
	async getAlerts() : Promise<Alert[]> {
		return await this.alertsService.getAlerts()
	}

	@Get(':id')
	async getAlert(@Param('id') id: number): Promise<Alert> {
		return await this.alertsService.getAlert(id)
	}
}
