### mysql利用触发器自动更新bigint时间戳

drizzle-kit 定义好schema 利用`drizzle-kit generate:mysql` 生成sql以后，再到生成的sql内加入下面触发器，然后执行migrate迁移方法即可

```sql
--> statement-breakpoint
CREATE TRIGGER before_user_update
BEFORE UPDATE ON users
FOR EACH ROW
SET NEW.test_update = UNIX_TIMESTAMP();
```

### zod dto总是可选的解决办法

设置tsconfig内的strictNullChecks为true

<https://stackoverflow.com/questions/71185664/why-does-zod-make-all-my-schema-fields-optional>

```json
// tsconfig文件strictNullChecks默认为false，但是如果开启strict，则默认为true
"strictNullChecks": true,
"strict": true
```

### 相关链接

<https://github.com/risen228/nestjs-zod/issues/23>

<https://github.com/drizzle-team/drizzle-orm/pull/1509>