import { PartialType } from '@nestjs/swagger';
import { CreateComicChapterContentDto } from './create-comic-chapter-content.dto';

export class UpdateComicChapterContentDto extends PartialType(CreateComicChapterContentDto) {}
