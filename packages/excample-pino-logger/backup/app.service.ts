import { Injectable, Logger } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppService {
  @InjectPinoLogger(AppService.name)
  private readonly logger: PinoLogger;
  constructor() {}

  getHello(): string {
    // this.logger.fatal('测试FATAL');
    this.logger.error('测试Error');
    // this.logger.warn('测试warn');
    // this.logger.info('测试Info');
    // this.logger.debug('debug信息');
    // this.logger.trace('trace信息');
    return 'Hello World!';
  }
}

// @Injectable()
// export class AppService {
//   // private readonly logger = new Logger(AppService.name);
//   constructor() {
//     // this.logger.debug('测试');
//     // this.logger.error('测试');
//     // this.logger.fatal('测试');
//   }

//   getHello(): string {
//     return 'Hello World!';
//   }
// }
