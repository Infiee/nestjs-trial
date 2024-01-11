### 开发测试使用

mikro-orm.config.ts必须创建，@mikro-orm/cli需要配置文件

// --run参数会执行sql，--dump参数会打印sql但是不执行
// 创建数据库
mikro-orm schema:create --run

// 更新数据库，如果entity有修改，则会更新到数据库上
mikro-orm schema:update --run

// 删除并重新创建数据库
mikro-orm schema:fresh --run

### 正式线使用
// 生成迁移文件，先得在src目录下创建migrations目录
mikro-orm migration:create --init

```javascript
// 需要先配置 extensions:[Migrator]
export default defineConfig({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  dbName: 'test_mikro',
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  debug: true,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
  extensions: [Migrator, EntityGenerator, SeedManager],
});
```
