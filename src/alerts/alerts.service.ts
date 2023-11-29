import { Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { AlertsApi, AlertsLogger } from './alerts.api'
import { AlertEntity } from './alerts.entity'
import { Alert } from './alerts.model'

@Injectable()
export class AlertsService {
	constructor(
		@InjectRepository(AlertEntity)
		private readonly alertsRepository: Repository<AlertEntity>,
		private readonly alertsApi: AlertsApi
	) {}

	async getAlerts(): Promise<Alert[]> {
		const alerts = await this.alertsRepository.find()
		return this.alertsApi.parseAlerts(alerts)
	}

	async getAlert(id: number): Promise<Alert> {
		const alert = await this.alertsRepository.findOne({ where: { id } });
		return alert && this.alertsApi.parseAlert(alert)
	}

	// avec origin_url et event_id, on regarde si une alerte triggered existe déjà, sinon on la crée (ou on la resolve selon le statut).
	// -> on fait une recherche sur origin_url, event_id, alert_status = ‘resolved’
	async create(alert: Alert): Promise<Alert> {
		const newEntity = this.alertsRepository.create(alert)
		return this.alertsRepository.save(newEntity)
	}

	async createOrUpdate(data: Alert): Promise<AlertEntity> {
		const { originUrl, eventId, ...rest } = data;
		let alert = await this.alertsRepository.findOne({ where: { originUrl, eventId } })

		if (alert) {
			const oldAlert = JSON.stringify(alert)
			alert = { 
				...alert,
				...rest,
				updatedAt: new Date()
			}

			AlertsLogger.info(`Alert modified. ID: ${alert.id}, previous value: ${oldAlert}, new value: ${JSON.stringify(alert)}`)
		} else {
			alert = new AlertEntity()
			alert.originUrl = originUrl
			alert.eventId = eventId
			if (alert.createdAt === undefined || alert.createdAt === null) {
				alert.createdAt = new Date()
			} else if (typeof alert.createdAt === 'string') {
				alert.createdAt = new Date(alert.createdAt)
			}
			alert.updatedAt = new Date()
			Object.assign(alert, rest)

			AlertsLogger.info(`Alert has been created. value: ${JSON.stringify(alert)}`)
		}

		return this.alertsRepository.save(alert)
	}
}
