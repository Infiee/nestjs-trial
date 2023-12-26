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
  create_time: string;

  @Property({
    // onUpdate: () => dayjs().unix() + '',
    nullable: true,
    type: BigIntType,
  })
  update_time: string;

  @BeforeCreate()
  @BeforeUpdate()
  public setUpdatedAt() {
    this.update_time = dayjs().unix() + '';
  }

  @BeforeCreate()
  public setCreatedAt() {
    this.create_time = dayjs().unix() + '';
  }
}
