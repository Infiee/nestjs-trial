import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as schema from '../drizzle/schema';
import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { UsersModule } from './users/users.module';

// nest-zod
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    DrizzleMySqlModule.registerAsync({
      tag: 'DB_PROD',
      useFactory() {
        return {
          mysql: {
            connection: 'client',
            config: {
              host: '127.0.0.1',
              user: 'root',
              password: 'root',
              database: 'test_drizzle_db',
            },
          },
          config: { schema: { ...schema }, mode: 'default' },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}
