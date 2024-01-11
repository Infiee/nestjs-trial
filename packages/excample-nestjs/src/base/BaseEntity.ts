import {
  BeforeCreate,
  BeforeUpdate,
  PrimaryKey,
  Property,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  BigIntType,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import dayjs from 'dayjs';

export abstract class BaseEntity {
  @ApiProperty()
  @PrimaryKey()
  id!: number;

  // @ApiProperty()
  // @Property()
  // createdAt = new Date();

  // @ApiProperty()
  // @Property({ onUpdate: () => new Date() })
  // updatedAt = new Date();

  /**
   * @description 创建时间
   * bigint查询的时候会自动转换成字符串返回
   */
  @ApiProperty()
  @Property({
    name: 'created_at',
    // type: new BigIntType('bigint'),
  })
  createdAt: number;
  // createdAt: bigint;

  @ApiProperty()
  @Property({
    name: 'updated_at',
    nullable: true,
    // type: new BigIntType('bigint'),
  })
  updatedAt: number;

  @BeforeCreate()
  @BeforeUpdate()
  public setUpdatedAt() {
    this.updatedAt = dayjs().unix();
  }

  @BeforeCreate()
  public setCreatedAt() {
    this.createdAt = dayjs().unix();
  }
}
