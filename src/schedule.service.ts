import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ShedulerService {
  private readonly logger = new Logger(ShedulerService.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCronTwo() {
    this.logger.debug('Called every 30 seconds');
  }
}
