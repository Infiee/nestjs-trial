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
    const [data, total] = await this.usersRepository.findAndCount();
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

  async remove(id: number) {
    // return this.usersRepository.delete({ id });
    const user = await this.findOne(id);
    if (!user) {
      throw new ApiException('用户不存在');
    }
    return this.usersRepository.remove(user);
  }

  async softRemove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new ApiException('用户不存在');
    }
    await this.usersRepository.softRemove(user);
    await this.usersRepository.save(user);
    return user;
  }

  async recover(id: number) {
    await this.usersRepository.restore(id);

    return this.findOne(id);
  }
}
