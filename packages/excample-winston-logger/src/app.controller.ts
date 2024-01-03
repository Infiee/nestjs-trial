import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  getHello(@Req() req): string {
    // this.logger.info('【测试MSG】', {
    //   message: '这是测试信息的msg',
    //   service: AppController.name,
    // });
    // this.logger.debug('Calling getHello() Debug', AppController.name);
    // this.logger.verbose('Calling getHello() Verbose', AppController.name);
    // this.logger.warn('Calling getHello() Warn', AppController.name);

    try {
      throw new Error();
    } catch (e) {
      // this.logger.error('调用 getHello() 错误', e.stack, AppController.name);
      this.logger.error('调用 getHello() 错误', {
        url: req.originalUrl,
        body: req.body,
        headers: req.headers,
        context: AppController.name,
      });
    }

    return this.appService.getHello();
  }

  @Get('log')
  async queryLog() {
    return new Promise((resolve) => {
      this.logger.query(
        {
          from: new Date(new Date().valueOf() - 24 * 60 * 60 * 1000 * 2),
          until: new Date(),
          // limit: 100,
          start: 0,
          order: 'desc',
          // fields: ['message'],
          fields: '',
        },
        function (err, results) {
          if (err) {
            throw err;
          }
          // console.log(results);
          resolve(results);
        },
      );
    });
  }

  @Post('log')
  createOne(@Body() data) {
    return {
      data: '测试创建日志',
      params: data,
    };
  }
}
