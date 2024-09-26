import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateApiHealthService } from './createApiHealth.service';
import { CreateJobDto } from './createJobDto';

@Controller('job')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly healthService: CreateApiHealthService,
  ) {}

  @Post()
  getHealth(@Body() CreateJobDto: CreateJobDto): string {
    const { name, seconds } = CreateJobDto;
    return this.healthService.addCronJob(name, seconds);
  }
}
