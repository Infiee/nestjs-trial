import { Module } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Comic } from './entities/comic.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Comic])],
  controllers: [ComicController],
  providers: [ComicService],
})
export class ComicModule {}
