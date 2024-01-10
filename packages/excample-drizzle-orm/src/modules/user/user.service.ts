import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserEntity } from './schema/user.schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@drizzle/schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { eq, gte, sql, count, SQL, inArray } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(@Inject('DB_DEV') private drizzle: NodePgDatabase<typeof schema>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.drizzle.insert(schema.user).values(createUserDto).returning();
  }

  async findAll() {
    const [users, total] = await Promise.all([
      this.drizzle.query.user.findMany({
        limit: 5,
        offset: 0,
        // where: gte(schema.user.id, 6),
      }),
      this.drizzle.select({ value: count() }).from(schema.user),
    ]);
    return { users, total: total.length };
  }

  async findOne(id: number) {
    // return await this.drizzle.query.user.findFirst({
    //   where: eq(schema.user.id, id),
    // });
    return this.drizzle
      .select({
        id: schema.user.id,
        username: schema.user.username,
      })
      .from(schema.user)
      .where(eq(schema.user.id, id));
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.drizzle
      .update(schema.user)
      .set(updateUserDto)
      .where(eq(schema.user.id, id))
      .returning();
  }

  async remove(id: number) {
    return await this.drizzle.delete(schema.user).where(eq(schema.user.id, id)).returning();
  }

  batchCreate(users: CreateUserDto[]) {
    return this.drizzle.transaction(async (tx) => {
      return tx.insert(schema.user).values(users).returning();
    });
  }

  batchUpdate(users: UserEntity[]) {
    const keys: (keyof UserEntity)[] = Object.keys(users[0]) as (keyof UserEntity)[];
    if (keys.length === 0) {
      throw new Error('数据为空');
    }

    // const ids: number[] = [];
    const genFieldSql = <T extends keyof UserEntity>(field: T) => {
      const sqlChunks: SQL[] = [];
      sqlChunks.push(sql`(case`);
      for (const user of users) {
        sqlChunks.push(sql`when id = ${user.id} then ${user[field]}`);
        // ids.push(user.id);
      }
      sqlChunks.push(sql`end)`);
      return sqlChunks;
    };

    return (
      this.drizzle
        .update(schema.user)
        .set({
          username: sql.join(genFieldSql('username'), sql.raw(' ')),
          email: sql.join(genFieldSql('email'), sql.raw(' ')),
          // createAt: sql.join(genFieldSql('createAt'), sql.raw(' ')),
          // updateAt: sql.join(genFieldSql('updateAt'), sql.raw(' ')).mapWith((value: any) => {
          //   if (value === null) return null;
          //   return new Date(value);
          // }),
        })
        // .where(inArray(schema.user.id, ids))
        .where(
          inArray(
            schema.user.id,
            users.map((user) => user.id),
          ),
        )
        .returning()
    );
    // return this.drizzle.transaction(async (tx) => {
    //   return tx.update(schema.user).set(users).returning();
    // });
  }
}
