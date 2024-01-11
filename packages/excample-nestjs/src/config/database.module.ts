import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log('configService----', configService);
        return {};
      },
      // useFactory: (configService: ConfigService) => ({
      //   // type: configService.get(""),
      //   // driver
      //   clientUrl: 'mysql://root:root@localhost:3306/test_nestjs',
      //   entities: ['./dist/**/*.entity.js'],
      //   entitiesTs: ['./src/**/*.entity.ts'],
      //   debug: true,
      // }),
    }),
  ],
})
export class DatabaseModule {}
