"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.users = (0, mysql_core_1.mysqlTable)('users', {
    id: (0, mysql_core_1.serial)('id').primaryKey().notNull(),
    username: (0, mysql_core_1.varchar)('name', { length: 256 }).notNull(),
    password: (0, mysql_core_1.varchar)('password', { length: 256 }).notNull(),
    email: (0, mysql_core_1.varchar)('email', { length: 256 }).notNull().unique(),
    createTime: (0, mysql_core_1.timestamp)('create_time').defaultNow().notNull(),
    updateTime: (0, mysql_core_1.timestamp)('update_time').defaultNow().onUpdateNow().notNull(),
    testUpdate: (0, mysql_core_1.bigint)('test_update', { mode: 'number' }).$defaultFn(() => (0, drizzle_orm_1.sql) `UNIX_TIMESTAMP()`),
});
exports.posts = (0, mysql_core_1.mysqlTable)('posts', {
    id: (0, mysql_core_1.serial)('id').primaryKey(),
    content: (0, mysql_core_1.varchar)('content', { length: 256 }),
    authorId: (0, mysql_core_1.int)('author_id'),
});
//# sourceMappingURL=schema.js.map