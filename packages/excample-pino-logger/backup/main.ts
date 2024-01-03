import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

import { Logger } from 'nestjs-pino';

import * as FileStreamRotator from 'file-stream-rotator';

// const envToLogger = {
//   development: {
//     transport: {
//       target: 'pino-pretty',
//       options: {
//         translateTime: 'HH:MM:ss Z',
//         ignore: 'pid,hostname',
//       },
//     },
//   },
//   production: true,
//   test: false,
// };

// const streams = [
//   {
//     level: 'info',
//     stream: FileStreamRotator.getStream({
//       filename: './logs/test-%DATE%',
//       frequency: 'daily',
//       date_format: 'YYYY-MM-DD',
//       // frequency: '1m',
//       // date_format: 'YMDHm',
//       size: '20M',
//       // max_logs: '10',
//       max_logs: '14d',
//       audit_file: './logs/audit.json',
//       extension: '.log',
//       create_symlink: true,
//       symlink_name: 'tail-current.log',
//     }),
//   },
// ];

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // new FastifyAdapter({
    //   logger: envToLogger['development'] ?? true,
    // }),
    new FastifyAdapter({
      logger: false,
      // logger: {
      // transport: {
      //   targets: [
      //     {
      //       target: 'pino-pretty',
      //       level: 'error',
      //       options: {
      //         translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      //         singleLine: true,
      //         ignore: 'pid,hostname,context',
      //       },
      //     },
      //   ],
      // },
      // level: 'trace',
      // transport:
      //   process.env.NODE_ENV !== 'production'
      //     ? {
      //         target: 'pino-pretty',
      //         options: {
      //           singleLine: true,
      //           ignore: 'pid,hostname,context',
      //         },
      //       }
      //     : undefined,
      // stream: FileStreamRotator.getStream({
      //   filename: './logs/test-%DATE%',
      //   frequency: 'daily',
      //   date_format: 'YYYY-MM-DD',
      //   // frequency: '1m',
      //   // date_format: 'YMDHm',
      //   size: '20M',
      //   // max_logs: '10',
      //   max_logs: '14d',
      //   audit_file: './logs/audit.json',
      //   extension: '.log',
      //   create_symlink: true,
      //   symlink_name: 'tail-current.log',
      // }),
      // },
    }),
    {
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(Logger));
  await app.listen(3000);
}

bootstrap();
