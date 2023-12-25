import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test_typeorm',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    // 异常过滤器
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule {}
