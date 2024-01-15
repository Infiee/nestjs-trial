import { Module } from '@nestjs/common';
import { DictTypeModule } from './dict-type/dict-type.module';
import { DictDataModule } from './dict-data/dict-data.module';

@Module({
  imports: [DictDataModule, DictTypeModule],
  controllers: [],
  providers: [],
})
export class DictModule {}
