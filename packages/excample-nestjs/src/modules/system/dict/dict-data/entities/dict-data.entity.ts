import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/BaseEntity';
import { DictType } from '../../dict-type/entities/dict-type.entity';

export enum DictDataStatus {
  /** 正常 */
  NORMAL = '0',
  /** 停用 */
  DISABLE = '1',
}

export enum DictDataIsDefault {
  /** 是 */
  YES = 'Y',
  /** 否 */
  NO = 'N',
}

@Entity({ tableName: 'sys_dict_data' })
export class DictData extends BaseEntity {
  @ApiProperty()
  @PrimaryKey()
  id: number;

  @ApiProperty()
  @Property({
    name: 'dict_label',
    comment: '字典标签',
  })
  dictLabel: string;

  @ApiProperty()
  @Property({
    name: 'dict_value',
    comment: '字典键值',
  })
  dictValue: string;

  @ApiProperty()
  @Enum({
    name: 'is_default',
    comment: '是否默认值',
    default: 'Y',
  })
  isDefault: DictDataIsDefault;

  /* 状态（0正常 1停用） */
  @ApiProperty()
  @Enum({
    nullable: true,
    comment: '状态（0正常 1停用）',
    default: '0',
    length: 1,
  })
  status: DictDataStatus;

  /* 字典类型 */
  @ApiHideProperty()
  @ManyToOne(() => DictType)
  dictType: DictType;
}
