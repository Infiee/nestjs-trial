import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';

import * as schema from '../../../drizzle/schema';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';

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
          config: { schema: { ...schema } },
        };
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
