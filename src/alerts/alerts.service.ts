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
//   getAlerts() : alert[] {
//     return mockedAlerts
//   }

  // private readonly alerts: alert[] = []

  // findAll() : alert[] {
  //   // return mockedAlerts;
  //   return this.alerts;
  // }

  // findOne(id : number) : alert {
  //   return this.alerts[id]
  // }

  // create(alert : alert) {
  //     this.alerts.push(alert)
  // }

  constructor(
    @InjectRepository(Alert)
    private alertsRepository: Repository<Alert>,
  ) {}

  findAll(): Promise<Alert[]> {
    return this.alertsRepository.find()
  }

  findOne(id: number): Promise<Alert | null> {
    return this.alertsRepository.findOneBy({ id })
  }

  // create(alert : alert) { // TODO - type
  //   console.log(`create alert => ${JSON.stringify(alert)}`)
  //   this.alertsRepository.create(alert)
  // }


  // avec origin_url et event_id, on regarde si une alerte triggered existe déjà, sinon on la crée (ou on la resolve selon le statut).
  // -> on fait une recherche sur origin_url, event_id, alert_status = ‘resolved’
  async create(alert: alert): Promise<alert> {
    const newEntity = this.alertsRepository.create(alert);
    return this.alertsRepository.save(newEntity);
  }

}