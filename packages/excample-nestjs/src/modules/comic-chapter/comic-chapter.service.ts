import { Injectable } from '@nestjs/common';
import { CreateComicChapterDto } from './dto/create-comic-chapter.dto';
import { UpdateComicChapterDto } from './dto/update-comic-chapter.dto';

@Injectable()
export class ComicChapterService {
  create(createComicChapterDto: CreateComicChapterDto) {
    return 'This action adds a new comicChapter';
  }

  findAll() {
    return `This action returns all comicChapter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comicChapter`;
  }

  update(id: number, updateComicChapterDto: UpdateComicChapterDto) {
    return `This action updates a #${id} comicChapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} comicChapter`;
  }
}
