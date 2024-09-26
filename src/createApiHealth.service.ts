import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { CronJob } from 'cron';
import { map, Observable } from 'rxjs';

interface IListObjectsResponse {
  id: string;
  name: string;
  data: Record<string, any>;
}

@Injectable()
export class CreateApiHealthService {
  constructor(
    private readonly httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  private readonly logger = new Logger(CreateApiHealthService.name);

  addCronJob(name: string, seconds: string): string {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
      this.listObjects().subscribe({
        next: (data) => {
          this.logger.log(`Data received: ${JSON.stringify(data)}`);
        },
        error: (err) => {
          this.logger.error(`Error: ${err.message}`);
        },
      });
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
    return `job ${name} added for each minute at ${seconds} seconds!`;
  }

  listObjects(): Observable<Array<IListObjectsResponse>> {
    return this.httpService
      .get<Array<IListObjectsResponse>>('https://api.restful-api.dev/objects')
      .pipe(map((res: AxiosResponse<Array<IListObjectsResponse>>) => res.data));
  }
}
