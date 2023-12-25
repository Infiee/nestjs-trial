### prisma monorepo使用

如果正常安装使用，运行的时候会出现一些问题，根目录`pnpm i`安装完依赖以后，切换到`excample-primsa`目录，依次执行下面命令

```json
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

### 遗弃的命令

```json
// 暂时没发现什么用，安装依赖到excample-prisma这个仓库，也加过-r参数了，运行的时候修改schema以后还是会报错
pnpm add prisma @prisma/client --filter excample-prisma
```
