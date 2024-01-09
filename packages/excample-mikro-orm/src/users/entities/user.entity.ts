import {
  BeforeCreate,
  BeforeUpdate,
  BigIntType,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import dayjs from 'dayjs';

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ tableName: 'user' })
export class UserEntity {
  @ApiProperty()
  @PrimaryKey()
  id: number;

  @ApiProperty()
  @Property()
  username: string;

  @ApiHideProperty()
  @Property({ hidden: true })
  password: string;

  @ApiProperty()
  @Property({ nullable: true })
  email: string;

  @ApiProperty()
  @Property({
    // onCreate: () => dayjs().unix() + '',
    type: BigIntType,
  })
  created_at: string;

  @ApiProperty()
  @Property({
    // onUpdate: () => dayjs().unix() + '',
    nullable: true,
    type: BigIntType,
  })
  updated_at: string;

  @BeforeCreate()
  @BeforeUpdate()
  public setUpdatedAt() {
    this.updated_at = dayjs().unix() + '';
  }

  @BeforeCreate()
  public setCreatedAt() {
    this.created_at = dayjs().unix() + '';
  }
}
