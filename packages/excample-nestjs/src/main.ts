import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { getPortPromise } from 'portfinder';
import { Logger } from '@nestjs/common';
import { AppModule, initialize } from './modules/app';

async function bootstrap() {
  const port = await getPortPromise({ port: 3000 });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  initialize(app);

  await app.listen(port);

  new Logger().log(`应用启动: http://localhost:${port}`);
}

bootstrap();
