# 依赖安装

如果只用zod做校验，可以不需要@anatine/zod-nestjs @anatine/zod-openapi库

```shell
# @anatine/zod-nestjs 把zod schema转换成dto
# @anatine/zod-openapi zod schema扩展openapi文档配置（nestjs-zod不支持配置example，这个可以）
pnpm add @anatine/zod-nestjs @anatine/zod-openapi @nestjs/swagger zod

# TODO: 如果只用zod做校验，可以不需要@anatine/zod-nestjs @anatine/zod-openapi库
pnpm add @nestjs/swagger zod
```

## 生成dto

- 方法一：只用zod做校验，entity和dto都再写一遍
- 方法二：用zod schema生成dto

### 剥离敏感字段

- 方法一：用zod schema，生成一个responseUserSchema（剥离密码字段）然后用schema的 parse 方法校验并返回数据（可以创建一个拦截器返回剥离后的数据更方便）

- 方法二：用class-transformer配套@UseInterceptors(ClassSerializerInterceptor)拦截器使用，在UserEntity内对需要剥离的字段属性@Exclude即可（参考官网<https://docs.nestjs.com/techniques/serialization>）
