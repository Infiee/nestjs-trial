import { Module } from '@nestjs/common';
import { ComicChapterContentService } from './comic-chapter-content.service';
import { ComicChapterContentController } from './comic-chapter-content.controller';

@Module({
  controllers: [ComicChapterContentController],
  providers: [ComicChapterContentService],
})
export class ComicChapterContentModule {}
