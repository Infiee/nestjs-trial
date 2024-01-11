import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComicService } from './comic.service';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @Post()
  create(@Body() createComicDto: CreateComicDto) {
    return this.comicService.create(createComicDto);
  }

  @Get()
  findAll() {
    return this.comicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComicDto: UpdateComicDto) {
    return this.comicService.update(+id, updateComicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comicService.remove(+id);
  }
}
