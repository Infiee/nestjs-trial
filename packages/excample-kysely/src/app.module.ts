import { Module } from '@nestjs/common';
import { MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { KyselyModule } from 'nestjs-kysely';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exception.filter';
// import { SerializePlugin } from 'kysely-plugin-serialize';

@Module({
  imports: [
    KyselyModule.forRoot({
      dialect: new MysqlDialect({
        pool: createPool({
          host: '127.0.0.1',
          user: 'root',
          password: 'root',
          database: 'test_kysely',
        }),
      }),
      log(event): void {
        if (event.level === 'query') {
          console.log(event.query.sql);
          console.log(event.query.parameters);
        }
      },
      plugins: [],
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
