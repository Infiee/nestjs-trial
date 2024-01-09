import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

type ArrayNumberType = number[];
type ArrayStringType = string[];

// 用户
export const user = pgTable('user', {
  id: serial('id'),
  username: varchar('username', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  createAt: timestamp('create_at').defaultNow().notNull(),
  updateAt: timestamp('update_at').defaultNow(),
});

// 用户阅读历史
export const userHistory = pgTable('user_history', {
  id: serial('id'),
  userId: integer('user_id').unique(),
  comicId: integer('comic_id').unique(),
  chapterId: integer('chapter_id').unique(),
  createAt: timestamp('create_at').defaultNow().notNull(),
  updateAt: timestamp('update_at').defaultNow(),
});

// 用户收藏
export const userCollection = pgTable('user_collection', {
  id: serial('id'),
  userId: integer('user_id').unique(),
  comicId: integer('comic_id').unique(),
  createAt: timestamp('create_at').defaultNow().notNull(),
});

// 作者
export const author = pgTable('author', {
  id: serial('id'),
  authorId: integer('author_id'),
});

// 漫画
export const comic = pgTable('comic', {
  id: serial('id'),
  title: varchar('name', { length: 256 }),
  region: varchar('region', { length: 256 }),
  status: varchar('status', { length: 50 }),
  latest_chapter: varchar('latest_chapter', { length: 256 }),
  cover: varchar('region', { length: 256 }),
  intro: varchar('region', { length: 1000 }),

  tagIds: integer('author_id').$type<ArrayNumberType>(),
  authorIds: integer('author_id').$type<ArrayNumberType>(),
});

// 漫画章节列表
export const comicChapter = pgTable('comic_chapter', {
  id: serial('id'),
  comicId: integer('comic_id').unique(),
  chapterTitle: varchar('chapter_title', { length: 256 }),
  order: integer('order'),
  createAt: timestamp('create_at').defaultNow().notNull(),
  updateAt: timestamp('update_at').defaultNow(),
});

// 漫画章节内容
export const chapterContent = pgTable('chapter_content', {
  id: serial('id'),
  comicId: integer('comic_id').unique(),
  chapterId: integer('chapter_id').unique(),
  images: integer('images').$type<ArrayStringType>(),
});

// 漫画tag
export const comicTag = pgTable('comic_tag', {
  id: serial('id'),
  name: varchar('name', { length: 256 }),
});

// 漫画统计信息
export const comicStatis = pgTable('comic_statis', {
  id: serial('id'),
  // 点击数
  clickCount: integer('click_count'),
  // 收藏数
  collectionCount: integer('collection_count'),
});

// 用户
//   阅读历史

// 漫画
//   标题
//   作者
//   题材
//   地区
//   连载状态
//   最新章节
//   章节列表
//   章节内容
//   简介
//   封面
//   创建时间
//   更新时间
//   是否下架

//   收藏数
//   点击数
//   // 评分
//   弹幕
//   评论

// 数据分析
//   漫画阅读量 - 每用户、每天、每章节只记录一次
//   漫画点击量 - 每用户每打开一个漫画详情、漫画章节记录一次
