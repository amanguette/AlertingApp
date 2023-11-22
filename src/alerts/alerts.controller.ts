import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common'
import { AlertsService } from './alerts.service'
import { alert } from './alerts.interface'


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
  

  // @Get()
  // async getAlerts() : Promise<alert[]> {
  //   return await this.alertsService.getAlerts()
  // }

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
