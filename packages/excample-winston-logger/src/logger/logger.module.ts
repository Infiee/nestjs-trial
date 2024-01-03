import { Module } from '@nestjs/common';

import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

import 'winston-daily-rotate-file';
import DailyRotateFile from 'winston-daily-rotate-file';

// const myFormat = winston.format.printf(
//   ({ level, message, label, timestamp, ...info }) => {
//     return `{ "timestamp": ${timestamp}, "message": "${message}"}`;
//   },
// );

const defaultLoggerOptions: DailyRotateFile.DailyRotateFileTransportOptions = {
  filename: 'error-%DATE%.log',
  level: 'error',
  json: true, // query查询日志必须设置
  dirname: `logs`, // 日志保存的目录
  datePattern: 'YYYY_MM_DD', // 日志轮换的频率，此处表示每天。
  zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
  maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
  maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
  // 记录时添加时间戳信息
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.ms',
    }),
    // winston.format.label({ label: '日志' }),
    winston.format.json(),
    // myFormat,
  ),
};

const logTransport = (
  options: DailyRotateFile.DailyRotateFileTransportOptions,
): DailyRotateFile => {
  return new winston.transports.DailyRotateFile(
    Object.assign({}, defaultLoggerOptions, options),
  );
};

const LogModule = WinstonModule.forRoot({
  level: 'silly',
  // defaultMeta: { service: 'user-service' },
  //   format: winston.format.json(),
  transports: [
    // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'logs/combined.log' }),

    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('日志信息', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    logTransport({
      filename: 'error-%DATE%.log',
      level: 'error',
    }),
    logTransport({
      filename: 'verbose-%DATE%.log',
      level: 'verbose',
    }),
  ],
});

@Module({
  imports: [LogModule],
  controllers: [],
  providers: [],
})
export class LoggerModule {}
