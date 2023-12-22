import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import {
  EntityRepository,
  NativeInsertUpdateOptions,
  wrap,
} from '@mikro-orm/core';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    await this.userRepository.getEntityManager().flush();
    return user;
  }

  async findAll() {
    const [items, total] = await this.userRepository.findAndCount(
      {},
      { limit: 10, offset: 0 },
    );
    return {
      items,
      total,
    };
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 方法一：
    const user = await this.userRepository.findOneOrFail(id);
    const updateUser = wrap(user).assign(updateUserDto);
    await this.userRepository.getEntityManager().flush();
    return updateUser;

    // 方法二：
    // const user = await this.userRepository.findOneOrFail(id);
    // return await this.userRepository.upsert(
    //   user,
    //   updateUserDto as NativeInsertUpdateOptions<User>,
    // );
  }

  async batchUpdate(batchUpdateUserDto: User[]) {
    // const users = await this.userRepository.upsertMany([
    //   {
    //     id: 4,
    //     username: 'x1_alias',
    //     password: '123456',
    //     email: '123@qq.com',
    //   },
    //   {
    //     id: 5,
    //     username: 'x2',
    //     password: '123456',
    //     email: '123@qq.com',
    //   },
    // ]);
    // return users;
    const ids = batchUpdateUserDto.map((item) => item.id);
    const users = await this.userRepository.find({
      id: {
        $in: ids,
      },
    });
    for (const user of users) {
      const item = batchUpdateUserDto.find((item) => item.id == user.id);
      if (item) {
        Object.assign(user, item);
      }
    }
    await this.userRepository.getEntityManager().flush();
    return users;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneOrFail(id);
    await this.userRepository.getEntityManager().remove(user).flush();
    return user;
  }
}
