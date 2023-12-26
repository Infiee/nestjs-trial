import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ApiException } from 'src/filters/api-execption';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll() {
    const [data, total] = await this.usersRepository.findAndCount({
      where: {},
      skip: 0,
      take: 10,
    });
    return { total, data };
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 这种方法不会触发@BeforeUpdate之类的hooks
    // return this.usersRepository.update(id, updateUserDto);

    const user = await this.findOne(id);
    if (!user) {
      throw new ApiException('用户不存在');
    }
    const updateUser = await this.usersRepository.merge(user, updateUserDto);
    this.usersRepository.save(updateUser);
    return updateUser;
  }

  // 删除
  async remove(id: number) {
    // return this.usersRepository.delete({ id });
    const user = await this.findOne(id);
    if (!user) {
      throw new ApiException('用户不存在');
    }
    return this.usersRepository.remove(user);
  }

  // 软删除
  async softRemove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new ApiException('用户不存在');
    }
    await this.usersRepository.softRemove(user);
    await this.usersRepository.save(user);
    return user;
  }

  // 恢复软删除
  async recover(id: number) {
    await this.usersRepository.restore(id);
    return this.findOne(id);
  }

  // 批量插入
  async batchInsert(users: CreateUserDto[]) {
    const items = [];
    for (const user of users) {
      const item = new User();
      Object.assign(item, user);
      items.push(item);
    }
    await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(items)
      .execute();
    return items;
  }

  // 批量更新
  // async batchUpdate(ids: number[], userData: CreateUserDto) {
  async batchUpdate(users: User[]) {
    const items = [];
    for (const user of users) {
      const item = new User();
      Object.assign(item, user);
      items.push(item);
    }
    await this.usersRepository.upsert(items, ['id']);
    return items;

    // await this.usersRepository
    //   .createQueryBuilder()
    //   .update(User)
    //   .set(userData)
    //   .whereInIds(ids)
    //   .execute();
    // return 'done';
  }
}
