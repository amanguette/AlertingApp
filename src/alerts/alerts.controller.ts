import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common'
import { CreateAlertDto } from './alerts.dto'
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
  @Post()
  async create(@Body(new ValidationPipe()) createAlertDto: CreateAlertDto) {
    this.alertsService.create(createAlertDto);
  }
  

  // @Get()
  // async getAlerts() : Promise<alert[]> {
  //   return await this.alertsService.getAlerts()
  // }

  @Get()
  async findAll() : Promise<alert[]> {
    return this.alertsService.findAll()
  }

  // @Get()
  // async findAll() {
  //   try {
  //     await this.alertsService.findAll()
  //   } catch (error) { 
  //     throw new HttpException({
  //       status: HttpStatus.FORBIDDEN,
  //       error: 'Forbidden error message',
  //     }, HttpStatus.FORBIDDEN, {
  //       cause: error
  //     })
  //   }
  // }


  // http://localhost:3000/alerts/12
  // @Get(':id')
  // findOne(@Param('id') id:number) : alert {
  //   return {
  //     id: id,
  //     originUrl: 'origin url',
  //     eventId: 'event id',
  //     description: "lalalahihou"
  //   };
  // }

  @Get(':id')
  async findOne(@Query('id', ParseIntPipe) id: number) {
    return this.alertsService.findOne(id);
  }


  // @Get()
  // async getProjects(@Res() res): Promise<string> {
  //   return await this.projectService.getProjects(0, 0).then(projects => res.json(projects))
  // }
  // @Get('/project/:id')
  // async getProject(@Param('id', new ParseIntPipe()) id, @Res() res): Promise<string> {
  //   return await this.projectService.getProjects(id).then(project => res.json(project[0]))
  // }



  // @Get()
  // async getAlerts(@Res() res): Promise<alertDto[]> {
  //   return await this.alertService.getProjects(0, 0).then(projects => res.json(projects))
  // }
}
