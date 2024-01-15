import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import {
  DictDataIsDefault,
  DictDataStatus,
} from '../entities/dict-data.entity';

export class CreateDictDataDto {
  // @ApiProperty({ description: '字典类型', example: 'sys_dict_type' })
  @ApiProperty({ description: '字典类型Id', example: '1' })
  @IsOptional()
  @IsString({ message: '请输入字典类型' })
  dictType: string;

  @ApiProperty({ description: '字典名', example: '启用' })
  @IsString({ message: '请输入字典名' })
  dictLabel: string;

  @ApiProperty({ description: '字典键值', example: '0' })
  @IsString({ message: '字典键值' })
  dictValue: string;

  @ApiProperty({ description: '是否默认值（Y是 N否）', example: 'Y' })
  @IsString({ message: '是否默认' })
  isDefault: DictDataIsDefault;

  @ApiProperty({ description: '状态（0正常 1停用）', example: '0' })
  @IsString({ message: '字典状态' })
  status: DictDataStatus;
}
