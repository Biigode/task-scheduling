import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateJobDto } from './createJobDto';
import { CreateShedulerService } from './createSheduler.service';

@Controller('job')
export class AppController {
  constructor(private readonly createShedulerService: CreateShedulerService) {}

  @Post()
  getHealth(@Body() CreateJobDto: CreateJobDto): Record<string, string> {
    const { name, seconds } = CreateJobDto;
    return this.createShedulerService.addCronJob(name, seconds);
  }

  @Get()
  listHealth(): Array<string> {
    return this.createShedulerService.listCronJob();
  }
}
