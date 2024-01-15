import { Module } from '@nestjs/common';
import { DictTypeService } from './dict-type.service';
import { DictTypeController } from './dict-type.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DictType } from './entities/dict-type.entity';

@Module({
  imports: [MikroOrmModule.forFeature([DictType])],
  controllers: [DictTypeController],
  providers: [DictTypeService],
  exports: [DictTypeService],
})
export class DictTypeModule {}
