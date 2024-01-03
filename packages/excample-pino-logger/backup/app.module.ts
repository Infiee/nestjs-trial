import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';

import { getStream } from 'file-stream-rotator';

import pino from 'pino';
import pretty from 'pino-pretty';

const createSonicBoom = (dest) =>
  pino.destination({ dest: dest, append: true, sync: true });
const logdir = './logs';

const streams = [
  { level: 'info', stream: createSonicBoom(`${logdir}/info.log`) },
  {
    stream: pretty({
      colorize: true,
      sync: true,
      // singleLine: true,
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      // ignore: 'pid,hostname,context',
      ignore: 'pid,hostname',
    }),
  },
  // { level: 'error', stream: createSonicBoom(`${logdir}/error.log`) },
  // {
  //   level: 'error',
  //   stream: getStream({
  //     filename: './logs/error-%DATE%',
  //     frequency: 'daily',
  //     date_format: 'YYYY-MM-DD',
  //     // frequency: '1m',
  //     // date_format: 'YMDHm',
  //     size: '10M',
  //     // max_logs: '10',
  //     max_logs: '14d',
  //     audit_file: './logs/audit-error.json',
  //     extension: '.log',
  //     create_symlink: true,
  //     symlink_name: 'tail-current-error.log',
  //   }),
  // },
  // {
  //   level: 'fatal',
  //   stream: getStream({
  //     filename: './logs/fatal-%DATE%',
  //     frequency: 'daily',
  //     date_format: 'YYYY-MM-DD',
  //     // frequency: '1m',
  //     // date_format: 'YMDHm',
  //     size: '10M',
  //     // max_logs: '10',
  //     max_logs: '14d',
  //     audit_file: './logs/audit.json',
  //     extension: '.log',
  //     create_symlink: true,
  //     symlink_name: 'tail-current.log',
  //   }),
  // },
];
// stream: getStream({
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

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: [
        {
          level: 'info',
          // name: 'nestjs-init',
          // formatters: { level: (level) => ({ level }) },
          // level: process.env.NODE_ENV === 'production' ? 'info' : 'trace',
          // autoLogging: false,
          // transport: {
          //   targets: [
          //     process.env.NODE_ENV === 'production'
          //       ? undefined
          //       : {
          //           target: 'pino-pretty',
          //           level: 'error',
          //           options: {
          //             translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          //             singleLine: true,
          //             ignore: 'pid,hostname,context',
          //           },
          //         },
          //   ],
          // },
        },
        pino.multistream(streams, {
          dedupe: true,
        }),
      ],
      // forRoutes: [MyController],
      // exclude: [{ method: RequestMethod.ALL, path: 'check' }],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
