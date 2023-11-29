import * as winston from 'winston'

import { AlertEntity } from './alerts.entity'
import { Alert } from './alerts.model'

export class AlertsApi {
	public parseAlerts(alerts : AlertEntity[]) : Alert[] {
		return alerts.map(alert => this.parseAlert(alert))
	}

	public parseAlert(rawAlert: AlertEntity) : Alert {
		const alertStatus = rawAlert.resolvedAt ? 'resolved' : 'triggered'
		return {
			...rawAlert,
			alertStatus
		}
	}
}

export const AlertsLogger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
	  winston.format.timestamp(),
	  winston.format.json()
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'logs/alerts.log' })
	]
})
