import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { MySql2Database } from "drizzle-orm/mysql2";
import * as schema from "../../drizzle/schema";
import { eq, gte, sql } from "drizzle-orm";

@Injectable()
export class UsersService {
  constructor(
    @Inject("DB_PROD") private drizzleProd: MySql2Database<typeof schema>
  ) {}
  create(createUserDto: CreateUserDto) {
    console.log("createUserDto---", createUserDto);
    // return 'This action adds a new user';
    return this.drizzleProd.insert(schema.users).values(createUserDto);
  }

  findAll() {
    // const q = this.drizzleProd.query.users.findMany({
    //   extras: {
    //     count: sql`count(*) over()`.as("count"),
    //   },
    //   limit: 5,
    //   offset: 0,
    //   // where: gte(product.id, 10),
    // });
    // console.log(q.toSQL());
    // return q;

    const statement = sql`
      SELECT
        COUNT(*) AS count,
        JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name, 'password', password, 'email', email, 'create_time', create_time, 'update_time', update_time, 'test', test, 'test_update', test_update)) AS data
      FROM
        users;
    `;
    return this.drizzleProd.execute(statement);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    return this.drizzleProd
      .update(schema.users)
      .set(updateUserDto)
      .where(eq(schema.users.id, id));
  }

  async remove(id: number) {
    // return `This action removes a #${id} user`;
    const response = await this.drizzleProd.transaction(async (tx) => {
      const insertedUser = this.drizzleProd.insert(schema.users).values({
        username: "My Name",
        password: "My Password",
        email: "My Email",
      });
      console.log('insertedUser---',insertedUser)
      const insertedId = insertedUser[0].id; // You'll have to double check this, I replying from memory

      const insertedPosts = this.drizzleProd.insert(schema.posts).values([
        { content: "My Title 1", authorId: insertedId },
        { content: "My Title 2", authorId: insertedId },
      ]);

      return [insertedUser, insertedPosts];
    });
    return response;
  }
}
