import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { User } from './entities/user.entity';
import { PaginationQueryDto } from './user.controller';

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

  async findAll(query: PaginationQueryDto) {
    const [items, total] = await this.userRepository.findAndCount(
      {},
      { limit: +query.limit, offset: +query.offset },
    );
    return {
      items,
      total,
    };
  }

  async findAllCursor(cursorId: number) {
    const currentCursor = await this.userRepository.findByCursor(
      {},
      {
        first: 10,
        after: { id: cursorId },
        orderBy: { id: 'asc' },
      },
    );
    return currentCursor;
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

  async remove(id: number) {
    // 方法一：会调用事务
    // const user = await this.userRepository.findOneOrFail(id);
    // await this.userRepository.getEntityManager().remove(user).flush();
    // return user;

    // 方法二：执行原生sql，如：delete from `user` where `id` in (2)
    return await this.userRepository.nativeDelete({ id });
  }

  async batchCreate(dto: User[]) {
    const data = [];
    for (const user of dto) {
      const newUser = new User();
      Object.assign(newUser, user);
      this.userRepository.getEntityManager().persist(newUser);
      data.push(newUser);
    }
    await this.userRepository.getEntityManager().flush();
    return data;
  }

  async batchUpdate(dto: User[]) {
    // 方法一：如果数据几乎总是存在，可能会增加一些性能开销，因为每次插入都需要检查唯一键冲突
    // const users = await this.userRepository.upsertMany(dto);
    // return users;

    // 方法二: 查找到数据以后直接更新
    const ids = dto.map((item) => item.id);
    const users = await this.userRepository.find({
      id: { $in: ids },
    });
    for (const user of users) {
      const item = dto.find((item) => item.id == user.id);
      if (item) {
        Object.assign(user, item);
      }
    }
    await this.userRepository.getEntityManager().flush();
    return users;
  }

  async batchRemove(ids: number[]) {
    console.log('ids---', ids);
    const users = await this.userRepository.find({
      id: { $in: ids },
    });
    this.userRepository.getEntityManager().remove(users);
    await this.userRepository.getEntityManager().flush();
    return users;
  }
}
