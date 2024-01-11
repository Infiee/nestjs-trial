# prisma monorepo使用

如果正常安装使用，运行的时候会出现一些问题，根目录`pnpm i`安装完依赖以后，切换到`excample-primsa`目录，依次执行下面命令

```typescript
// 生成prisma文件
pnpm prisma init

prisma migrate dev --name init

pnpm prisma generate

pnpm prisma db push

// 比如：user.service.ts，引入这个是关键，不然就会提示错误
import { Prisma } from '@prisma/client';
// 没引入的时候会有这个错误提示
src/users/users.controller.ts:11:3 - error TS2742: The inferred type of 'create' cannot be named without a reference to '.pnpm/@prisma+client@5.7.1_prisma@5.7.1/node_modules/.prisma/client'. This is likely not portable. A type annotation is necessary.

```

## prisma的一些小缺点

1. 属性剥离问题 [Issues](https://github.com/prisma/prisma/issues/5042)
   - 处理方法：通过[Entity属性剥离](https://juejin.cn/post/7236951503796371513#heading-7)或自行对返回数据剥离 如omit(user,['password'])
   - Typeorm可以在Entity实体内通过Exclude和ClassSerializerInterceptor拦截器自动剥离
2. prisma client自定义扩展问题  [issues链接](https://github.com/prisma/prisma/issues/18628)
3. 分页计数问题 [issues链接](https://github.com/prisma/prisma/issues/7550)

### 暂时用不到的命令

```typescript
// 暂时没发现什么用，安装依赖到excample-prisma这个仓库，也加过-r参数了，运行的时候修改schema以后还是会报错
pnpm add prisma @prisma/client --filter excample-prisma
```
