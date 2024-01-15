import { Module } from '@nestjs/common';
import { DictDataService } from './dict-data.service';
import { DictDataController } from './dict-data.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DictData } from './entities/dict-data.entity';
import { DictTypeModule } from '../dict-type/dict-type.module';

@Module({
  imports: [MikroOrmModule.forFeature([DictData]), DictTypeModule],
  controllers: [DictDataController],
  providers: [DictDataService],
})
export class DictDataModule {}
