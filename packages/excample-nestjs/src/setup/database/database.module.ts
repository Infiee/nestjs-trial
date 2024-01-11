import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    // MikroOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //         driver: MySqlDriver
    //         clientUrl: 'mysql://root:root@localhost:3306/test_nestjs',
    //         entities: ['./dist/**/*.entity.js'],
    //         entitiesTs: ['./src/**/*.entity.ts'],
    //         debug: true,
    //       },
    //   },
    //   inject: [ConfigService]
    // })
  ],
})
export class DatabaseModule {}
