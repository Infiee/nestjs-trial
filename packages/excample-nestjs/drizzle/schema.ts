import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

// manage your schema
export const users = pgTable('users', {
  id: serial('id'),
  username: varchar('name', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  createTime: timestamp('create_time').defaultNow().notNull(),
  updateTime: timestamp('update_time').defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id'),
  content: varchar('content', { length: 256 }),
  authorId: integer('author_id'),
});
