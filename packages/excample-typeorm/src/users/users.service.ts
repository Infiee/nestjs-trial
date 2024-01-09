import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ApiException } from 'src/filters/api-execption';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // const userName = await this.usersRepository.findOne({
    //   where: { username: createUserDto.username },
    // });
    // if (userName) {
    //   throw new HttpException('用户名已存在', 401);
    // }
    // const userEmail = await this.usersRepository.findOne({
    //   where: { email: createUserDto.email },
    // });
    // if (userEmail) {
    //   throw new HttpException('用户Email已存在', 401);
    // }
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
    // 方法一：
    // const items = [];
    // for (const user of users) {
    //   const item = new User();
    //   Object.assign(item, user);
    //   items.push(item);
    // }
    // await this.usersRepository.upsert(items, ['id']);
    // return items;

    // 方法二：
    // await this.usersRepository
    //   .createQueryBuilder()
    //   .update(User)
    //   .set(userData)
    //   .whereInIds(ids)
    //   .execute();
    // return 'done';

    // TODO: 方法三，暂时发现的最优解！：
    const result = await this.dataSource.transaction(async (manage) => {
      // TODO: 只能用manage进行处理，不然不会自动回滚
      // 遍历每个用户更新数据
      const updatePromises = users.map(async (userData) => {
        const { id, ...updates } = userData;

        const user = await manage.findOne(User, { where: { id } });
        const updateUser = await manage.merge(User, user, updates);
        await manage.save(updateUser);
        return updateUser;
      });
      const updatedData = await Promise.all(updatePromises);
      return updatedData;
    });
    return result;

    // 下面方法不知道为啥不自动回滚，暂时不想了，typeorm还是有些坑
    // await this.dataSource.transaction(async (transactionalEntityManager) => {
    //   const queryRunner = this.dataSource.createQueryRunner();
    //   await queryRunner.connect();
    //   await queryRunner.startTransaction();
    //   try {
    //     // 遍历每个用户更新数据
    //     const updatePromises = users.map((userData) => {
    //       const { id, ...updates } = userData;
    //       return this.update(id, updates);
    //     });
    //     await Promise.all(updatePromises);

    //     await queryRunner.commitTransaction();
    //     console.log('还是执行了---------');
    //   } catch (e) {
    //     console.log('监听到错误了-执行回滚---', e);
    //     await queryRunner.rollbackTransaction();
    //     throw e;
    //   } finally {
    //     await queryRunner.release();
    //   }
    // });
  }
}
