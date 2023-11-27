import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { alert } from './alerts.interface';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
	constructor(private alertsService: AlertsService) {}

	@Post()
	async createOrUpdateAlert(@Body() data: alert) {
		return this.alertsService.createOrUpdate(data)
	}

	@Get()
	async getAlerts() : Promise<alert[]> {
		return await this.alertsService.getAlerts()
	}

	@Get(':id')
	async getAlert(@Param('id') id: number): Promise<alert> {
		return await this.alertsService.getAlert(id)
	}
}
