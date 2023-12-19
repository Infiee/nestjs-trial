import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  datetime,
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
// import { createInsertSchema } from 'drizzle-zod';
// import { z } from 'zod';

// manage your schema
export const users = mysqlTable("users", {
  id: serial("id").primaryKey().notNull(),
  username: varchar("name", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  createTime: timestamp("create_time").defaultNow().notNull(),
  updateTime: timestamp("update_time").defaultNow().onUpdateNow().notNull(),
  test: bigint("test", { mode: "number" }).$defaultFn(
    () => sql`UNIX_TIMESTAMP()`
  ),
  testUpdate: bigint("test_update", { mode: "number" }).$defaultFn(
    () => sql`UNIX_TIMESTAMP()`
  ),
  // test: bigint('test', { mode: 'bigint' }).references(() => users.id, {
  //   onDelete: 'cascade',
  //   onUpdate: 'cascade',
  // }),
});

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  content: varchar("content", { length: 256 }),
  authorId: int("author_id"),
});

// export const insertUserSchema = createInsertSchema(users, {
//   // id: (schema) => schema.id.positive(),
//   // name: (schema) => schema.name.email(),
//   username: z.string({
//     required_error: '请输入用户名',
//     invalid_type_error: '用户名类型无效',
//   }),
//   password: z.string({
//     required_error: '请输入密码',
//     invalid_type_error: '用户名类型无效',
//   }),
//   email: z.string({
//     required_error: '请输入邮箱',
//     invalid_type_error: '邮箱类型错误',
//   }),
// });
