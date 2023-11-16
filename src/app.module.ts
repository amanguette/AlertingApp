import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// import { Alert } from './alerts/alerts.entity';
import { alertsModule } from './alerts/alerts.module';
import { Alert } from './alerts/alerts.entity';

@Module({
  imports: [
    alertsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'alerting',
      entities: [Alert],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
