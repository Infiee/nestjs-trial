import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyRequest } from 'fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: FastifyRequest): string {
    // request.log.trace('记录跟踪请求');
    // request.log.error('记录ERROR请求');
    return this.appService.getHello();
  }
}
