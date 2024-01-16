- 枚举类型：<https://github.com/kysely-org/kysely/issues/112>

```json
// package.json内新增
"migrations": "ts-node ./src/runMigrations.ts"
```

运行`pnpm migrations`运行迁移生成数据库或更新数据库操作


### 相关链接

- <https://github.com/prisma/studio/issues/614> - 提示bigint错误