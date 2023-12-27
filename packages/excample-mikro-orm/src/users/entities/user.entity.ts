import {
  BeforeCreate,
  BeforeUpdate,
  BigIntType,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import dayjs from 'dayjs';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  username: string;

  @Property({ hidden: true })
  password: string;

  @Property({ nullable: true })
  email: string;

  @Property({
    // onCreate: () => dayjs().unix() + '',
    type: BigIntType,
  })
  created_at: string;

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
