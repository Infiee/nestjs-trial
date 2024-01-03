import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.verbose('世界你好啊！verbose');
    return 'Hello World!';
  }
}
