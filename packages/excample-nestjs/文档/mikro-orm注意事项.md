# 知识点

1. Dto主要是接口传递数据校验用的，Entity主要是Swagger文档ApiResponse响应类型或者使用Typeorm建表用的

# mikro-orm注意事项

<https://mikro-orm.io/docs/usage-with-nestjs>

NestJS 内置序列化依赖于类转换器。由于 MikroORM 将每个实体关系包装在 Reference 或 Collection 实例中（为了类型安全），这将使内置 ClassSerializerInterceptor 对任何实体关系都视而不见。包裹关系。换句话说，如果您从 HTTP 或 WebSocket 处理程序返回 MikroORM 实体，它们的所有关系都不会被序列化
