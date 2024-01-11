import { Entity, Property } from '@mikro-orm/core';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/BaseEntity';

@Entity({ tableName: 'user' })
export class User extends BaseEntity {
  @ApiProperty()
  @Property({
    comment: '用户名',
  })
  username: string;

  @ApiHideProperty()
  @Property({
    hidden: true, // 等价于 class-transformer的 `@Exclude`
    comment: '密码',
  })
  password: string;

  @ApiProperty()
  @Property({
    nullable: true,
    comment: '邮箱',
  })
  email: string;
}
