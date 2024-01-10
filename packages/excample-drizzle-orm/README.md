### 

### 技术栈

- orm：drizzle-orm 
- 数据库：postgresql
- 日志：pino
- 校验：zod
- 缓存：redis
- http框架：fastify

### 相关命令

```shell
pnpm add @nestjs/platform-fastify

@fastify/helmet

@nestjs/swagger

pnpm add zod @anatine/zod-nestjs @anatine/zod-openapi

@nestjs/config

pnpm add drizzle-orm pg
pnpm add -D drizzle-kit @types/pg

```

### eslint和prettier规则冲突的解决方法

```json
// 文件.prettierrc
// 比如规则新增了printWidth:100导致eslint校验错误
{
  ...
  "printWidth": 100
}
```

```javascript
// 文件.eslintrc.js
module.exports = {
  // 默认会导入'plugin:prettier/recommended'
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    ...
    // TODO: 同步prettier的配置，然后就不会提示错误了
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
      },
    ],
  }
}  
```

### issues跟进

<https://github.com/drizzle-team/drizzle-orm/issues/1592>

### 相关链接

- <https://node-postgres.com/apis/cursor>
- <https://github.com/porsager/postgres>