import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { alert } from './alerts.interface';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
	constructor(private alertsService: AlertsService) {}

	// https://docs.nestjs.com/controllers#request-payloads
	// @Post()
	// async create(@Body() createAlertDto: CreateAlertDto) {
	//   this.alertsService.create(createAlertDto);
	// }
	// @Post()
	// async create(@Body(new ValidationPipe()) createAlertDto: CreateAlertDto) {
	//   this.alertsService.create(createAlertDto);
	// }

	@Post()
	async createOrUpdateAlert(@Body() data: alert) {
		return this.alertsService.createOrUpdate(data);
		// /!\ createAlertDto unused now, think about reusing it or delete
	}

	@Get()
	async getAlerts() : Promise<alert[]> {
		return this.alertsService.getAlerts()
	}

	// http://localhost:3000/alerts/1
	@Get(':id')
	async getAlert(@Param('id') id: number): Promise<alert> {
		return this.alertsService.getAlert(id);
	}
}
