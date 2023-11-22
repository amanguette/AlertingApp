import { Injectable } from '@nestjs/common'
import { alert } from './alerts.interface'
import { Alert } from './alerts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockedAlerts = [
    {
      id: 0,
      originUrl: 'origin url',
      eventId: 'event id',
      description: "lorem ipsum dolor wsh wsh"
    },
    {
      id: 1,
      originUrl: 'origin url',
      eventId: 'event id',
      description: "hellou"
    },
    {
      id: 2,
      originUrl: 'origin url',
      eventId: 'event id',
      description: "lalalahihou"
    },
];

// constructeur qui importe le repository de l'entity (le repo porte toutes les focntions de lecture et écriture)


@Injectable()
export class AlertsService {

  constructor(
    @InjectRepository(Alert)
    private readonly alertsRepository: Repository<Alert>,
  ) {}

  getAlerts(): Promise<Alert[]> {
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
        updatedAt: new Date(Date.parse(new Date().toISOString()))
      };
    } else {
      // If no existing alert was found, create a new alert with the specified values
      alert = new Alert();
      alert.originUrl = originUrl;
      alert.eventId = eventId;
      alert.updatedAt = new Date(Date.parse(new Date().toISOString()));
      Object.assign(alert, rest);
    }

    if (alert.createdAt === undefined || alert.createdAt === null) {
      alert.createdAt = new Date();
    } else if (typeof alert.createdAt === 'string') {
      alert.createdAt = new Date(alert.createdAt);
    }

    // Save the alert to the database and return the resulting entity
    return this.alertsRepository.save(alert);
  }
}