# 序言

起初是准备一步到位，经过一系列的新框架和库的尝试，发现还是不能一口子吃成胖子，官网的那一套是最简单、最稳的

- Express如果切换为Fastify，需要注意他们之间的一些库是不通用的（helmet、multer、static）等
- Orm 还是 Typeorm 配套最稳，但是有些api设计的比较坑，比如@BeforeUpdate之类hooks的监听触发
- 验证和属性剥离class-validator、class-transformer
- 日志 winston最简单 有自动切分日志、pino需要额外配置一些库但性能优于winston

### 项目技术栈

- orm：mikro-orm（初步试用了下觉着比typeorm的api设计的好一些）
- 数据库：mysql（虽然现在国外大部分都在推Pg，但国内估计还是mysql比较多）
- 日志：pino
- 校验：class-validator（配合Class Dto比较方便，用了一圈Zod 结合 nestjs、openapi等全面考量，还是觉着这一套最搭）
- 缓存：redis
- http框架：fastify（暂时不切换了，等Express跑通了再慢慢替换看性能）

### 相关命令

```shell
pnpm add @nestjs/platform-fastify

@fastify/helmet

@nestjs/swagger

@nestjs/config
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