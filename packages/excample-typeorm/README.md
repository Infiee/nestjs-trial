### 执行命令

```json
// 项目初始化完以后，加入typeorm依赖
pnpm add @nestjs/typeorm typeorm mysql2

// 序列化和自动校验
pnpm add class-validator class-transformer

// 密码散列
pnpm add bcrypt

// openapi
pnpm add @nestjs/swagger
```

### 注意

1. 想要触发entity内的`@BeforeUpdate`之类的hooks需要用实体调用save方法

@BeforeInsert、@AfterInsert、@BeforeUpdate、@AfterUpdate 仅在使用 repository.save 插入/更新实体时触发，@Before/After在 Remove 的时候触发

```typescript
// 如更新操作，先用实体找到某个用户
const user = this.usersRepository.findOne({ where: { id } });

// @Before/After Remove触发
this.usersRepository.remove(user);
```

1. 如果要使用`softRemove`，需要设置`column`为`@DeleteDateColumn`

```typescript
@Entity()
export class User {
  ...

  // 设置为软删除日期列，这里设置为bigint是为了监听@AfterSoftRemove事件设置为biginit的unix时间戳
  @DeleteDateColumn({ type: 'bigint', nullable: true })
  deleted_at?: number;

  // TODO: 监听`@AfterSoftRemove`需要设置，记得更新实体，调用save方法，不然这里的更新字段操作不会生效！！！
  @AfterSoftRemove()
  @BeforeRemove()
  public setDeletedAt() {
    this.deleted_at = dayjs().unix();
  }
}

// TODO: 监听软删除事件以后的操作，需要更新实体，调用save方法 不然这里的更新字段操作不会生效！！！
async remove(id: number) {
  const user = await this.findOne(id);
  if (!user) {
    throw new ApiException('用户不存在');
  }
  await this.usersRepository.softRemove(user);
  await this.usersRepository.save(user);
  return user;
}
```
