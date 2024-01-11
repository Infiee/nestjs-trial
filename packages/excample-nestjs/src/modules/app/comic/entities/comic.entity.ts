import { Entity, Enum, Property } from '@mikro-orm/core';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/BaseEntity';

export enum ComicStatus {
  /** 连载中 */
  SERIALIZING = '0',
  /** 已完结 */
  COMPLETED = '1',
}

@Entity({ tableName: 'comic' })
export class Comic extends BaseEntity {
  @ApiProperty()
  @Property({
    comment: '漫画标题',
  })
  title: string;

  @ApiHideProperty()
  @Property({
    comment: '漫画地区',
  })
  region: string;

  @ApiProperty()
  @Enum({
    comment: '连载状态',
  })
  status: ComicStatus;

  @ApiProperty()
  @Property({})
  cover: string;

  @ApiProperty()
  @Property({})
  intro: string;

  @ApiProperty()
  @Property({})
  tagIds: string;

  /** 可能多个作者 */
  @ApiProperty()
  @Property({})
  author: string;
}

// latest_chapter: varchar('latest_chapter', { length: 256 }),
// : integer('author_id').$type<ArrayNumberType>(),
// authorIds: integer('author_id').$type<ArrayNumberType>(),
