import { Injectable } from '@nestjs/common';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';

@Injectable()
export class ComicService {
  create(createComicDto: CreateComicDto) {
    return 'This action adds a new comic';
  }

  findAll() {
    return `This action returns all comic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comic`;
  }

  update(id: number, updateComicDto: UpdateComicDto) {
    return `This action updates a #${id} comic`;
  }

  remove(id: number) {
    return `This action removes a #${id} comic`;
  }
}
