import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/BaseEntity';
import { DictData } from '../../dict-data/entities/dict-data.entity';

export enum DictTypeStatus {
  /** 正常 */
  NORMAL = '0',
  /** 停用 */
  DISABLE = '1',
}

@Entity({ tableName: 'sys_dict_type' })
export class DictType extends BaseEntity {
  @ApiProperty()
  @PrimaryKey()
  id: number;

  @ApiProperty()
  @Property({
    name: 'dict_name',
    comment: '字典名称',
    unique: true,
  })
  dictName: string;

  @ApiProperty()
  @Property({
    name: 'dict_type',
    comment: '字典类型',
  })
  dictType: string;

  /* 状态（0正常 1停用） */
  @ApiProperty()
  @Enum({
    nullable: true,
    comment: '状态（0正常 1停用）',
    default: '0',
    length: 1,
  })
  status: DictTypeStatus;

  /** 字典类型数据 */
  @ApiHideProperty()
  @OneToMany(() => DictData, (dictData) => dictData.dictType)
  dictDatas = new Collection<DictData>(this);
  // dictDatas: DictData[];
}
