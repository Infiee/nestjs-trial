import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './schema/user.schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from '../../../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(@Inject('DB_DEV') private drizzle: NodePgDatabase<typeof schema>) {}

  async create(createUserDto: CreateUserDto) {
    await this.drizzle.insert(schema.user).values(createUserDto as unknown as any);
    const user = this.drizzle.query.user.findFirst({
      where: eq(schema.user.email, createUserDto.email),
    });
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
