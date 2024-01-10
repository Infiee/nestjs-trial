import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComicChapterService } from './comic-chapter.service';
import { CreateComicChapterDto } from './dto/create-comic-chapter.dto';
import { UpdateComicChapterDto } from './dto/update-comic-chapter.dto';

@Controller('comic-chapter')
export class ComicChapterController {
  constructor(private readonly comicChapterService: ComicChapterService) {}

  @Post()
  create(@Body() createComicChapterDto: CreateComicChapterDto) {
    return this.comicChapterService.create(createComicChapterDto);
  }

  @Get()
  findAll() {
    return this.comicChapterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comicChapterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComicChapterDto: UpdateComicChapterDto) {
    return this.comicChapterService.update(+id, updateComicChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comicChapterService.remove(+id);
  }
}
