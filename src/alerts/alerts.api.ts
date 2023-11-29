import { AlertEntity } from './alerts.entity';
import { Alert } from './alerts.model';

export class AlertApi {
    public parseAlerts(alerts : AlertEntity[]) : Alert[] {
        return alerts.map(alert => this.parseAlert(alert));
    }

    public parseAlert(rawAlert: AlertEntity) : Alert {
        const alertStatus = rawAlert.resolvedAt ? 'resolved' : 'triggered'
        return {
            ...rawAlert,
            alertStatus
        }
    }
}