import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DictTypeStatus } from '../entities/dict-type.entity';

export class CreateDictTypeDto {
  @ApiProperty({ description: '字典名', example: '菜单状态' })
  @IsString({ message: '请输入字典名' })
  dictName: string;

  @ApiProperty({ description: '字典类型', example: 'sys_menu_status' })
  @IsString({ message: '请输入字典类型' })
  dictType: string;

  @ApiProperty({ description: '状态（0正常 1停用）', example: '0' })
  @IsString({ message: '字典状态' })
  status: DictTypeStatus;
}
