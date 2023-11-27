import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Alert } from './alerts.entity';
import { alert } from './alerts.interface';

@Injectable()
export class AlertsService {
	constructor(
		@InjectRepository(Alert)
		private readonly alertsRepository: Repository<Alert>,
	) {}

	getAlerts(): Promise<alert[]> {
		return this.alertsRepository.find()
	}

	getAlert(id: number): Promise<Alert> {
		return this.alertsRepository.findOne({ where: { id } });
	}

	// avec origin_url et event_id, on regarde si une alerte triggered existe déjà, sinon on la crée (ou on la resolve selon le statut).
	// -> on fait une recherche sur origin_url, event_id, alert_status = ‘resolved’
	async create(alert: alert): Promise<alert> {
		const newEntity = this.alertsRepository.create(alert);
		return this.alertsRepository.save(newEntity);
	}

	async createOrUpdate(data: alert): Promise<Alert> {
		const { originUrl, eventId, ...rest } = data;
		let alert = await this.alertsRepository.findOne({ where: { originUrl, eventId } });

		if (alert) {
			// If an existing alert was found, update it and update the updatedAt date with now
			alert = { 
				...alert,
				...rest,
				updatedAt: new Date()
			};
		} else {
			// If no existing alert was found, create a new alert with the specified values
			alert = new Alert();
			alert.originUrl = originUrl;
			alert.eventId = eventId;
			if (alert.createdAt === undefined || alert.createdAt === null) {
				alert.createdAt = new Date();
			} else if (typeof alert.createdAt === 'string') {
				alert.createdAt = new Date(alert.createdAt);
			}
			alert.updatedAt = new Date();
			Object.assign(alert, rest);
		}

		// Save the alert to the database and return the resulting entity
		return this.alertsRepository.save(alert);
	}
}