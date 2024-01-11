import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComicChapterContentService } from './comic-chapter-content.service';
import { CreateComicChapterContentDto } from './dto/create-comic-chapter-content.dto';
import { UpdateComicChapterContentDto } from './dto/update-comic-chapter-content.dto';

@Controller('comic-chapter-content')
export class ComicChapterContentController {
  constructor(private readonly comicChapterContentService: ComicChapterContentService) {}

  @Post()
  create(@Body() createComicChapterContentDto: CreateComicChapterContentDto) {
    return this.comicChapterContentService.create(createComicChapterContentDto);
  }

  @Get()
  findAll() {
    return this.comicChapterContentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comicChapterContentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComicChapterContentDto: UpdateComicChapterContentDto) {
    return this.comicChapterContentService.update(+id, updateComicChapterContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comicChapterContentService.remove(+id);
  }
}
