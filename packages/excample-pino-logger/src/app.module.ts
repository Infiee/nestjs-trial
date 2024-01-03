import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';

import path from 'node:path';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              // level: 'info',
              options: {
                translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                singleLine: true,
                ignore: 'pid,hostname',
                // ignore: 'pid,hostname,context',
              },
            },
            {
              target: path.resolve('./dist/utils/transport-stream.js'),
              level: 'info',
              options: {
                destination: 'info.log',
                // append: true,
                // destination: path.resolve('./logs/info.log'),
                // interval: '5s',
                // interval: '10m',
                // compress: false,
              },
            },
          ],
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
