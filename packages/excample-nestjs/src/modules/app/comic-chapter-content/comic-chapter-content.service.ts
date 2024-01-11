import { Injectable } from '@nestjs/common';
import { CreateComicChapterContentDto } from './dto/create-comic-chapter-content.dto';
import { UpdateComicChapterContentDto } from './dto/update-comic-chapter-content.dto';

@Injectable()
export class ComicChapterContentService {
  create(createComicChapterContentDto: CreateComicChapterContentDto) {
    return 'This action adds a new comicChapterContent';
  }

  findAll() {
    return `This action returns all comicChapterContent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comicChapterContent`;
  }

  update(id: number, updateComicChapterContentDto: UpdateComicChapterContentDto) {
    return `This action updates a #${id} comicChapterContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} comicChapterContent`;
  }
}
