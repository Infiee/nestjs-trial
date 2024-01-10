import { Module } from '@nestjs/common';
import { ComicChapterService } from './comic-chapter.service';
import { ComicChapterController } from './comic-chapter.controller';

@Module({
  controllers: [ComicChapterController],
  providers: [ComicChapterService],
})
export class ComicChapterModule {}
