import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { CreateShedulerService } from './createSheduler.service';
import { ShedulerService } from './schedule.service';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [ShedulerService, CreateShedulerService],
})
export class AppModule {}
