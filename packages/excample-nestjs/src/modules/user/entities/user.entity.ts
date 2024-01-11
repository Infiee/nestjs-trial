import { Entity, Property } from '@mikro-orm/core';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/BaseEntity';

@Entity({ tableName: 'user' })
export class User extends BaseEntity {
  @ApiProperty()
  @Property()
  username: string;

  @ApiHideProperty()
  @Property({ hidden: true }) // Equivalent of class-transformer's `@Exclude`
  password: string;

  @ApiProperty()
  @Property({ nullable: true })
  email: string;
}
