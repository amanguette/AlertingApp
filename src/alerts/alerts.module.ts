import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AlertApi } from './alerts.api'
import { AlertsController } from './alerts.controller'
import { AlertEntity } from './alerts.entity'
import { AlertsService } from './alerts.service'

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([AlertEntity])],
	controllers: [AlertsController],
	providers: [AlertsService, AlertApi]
})
export class alertsModule {}
