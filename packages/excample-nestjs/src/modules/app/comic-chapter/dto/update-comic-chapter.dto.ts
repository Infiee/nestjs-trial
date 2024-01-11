import { PartialType } from '@nestjs/swagger';
import { CreateComicChapterDto } from './create-comic-chapter.dto';

export class UpdateComicChapterDto extends PartialType(CreateComicChapterDto) {}
