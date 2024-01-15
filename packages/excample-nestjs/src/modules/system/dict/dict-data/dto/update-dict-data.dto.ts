import { OmitType } from '@nestjs/swagger';
import { CreateDictDataDto } from './create-dict-data.dto';

export class UpdateDictDataDto extends OmitType(CreateDictDataDto, [
  'dictType',
]) {}
