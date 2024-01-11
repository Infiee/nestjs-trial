import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 自定义验证
      validate,
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      load: [configuration],
    }),
  ],
})
export class AppConfigModule {}
