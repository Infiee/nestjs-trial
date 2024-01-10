import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';

import * as schema from '@drizzle/schema';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/all-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    DrizzlePGModule.registerAsync({
      tag: 'DB_DEV',
      useFactory() {
        return {
          pg: {
            connection: 'client',
            config: {
              connectionString: process.env.DATABASE_PG_URL,
            },
          },
          config: { schema: { ...schema }, logger: true },
        };
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
