import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';

// TODO: 不引入这个会提示错误！！！
import { Prisma } from '@prisma/client'; //eslint-disable-line

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // TODO: 方法一：不需要自己创建dto
  // create(createUserDto: Prisma.UserCreateInput) {
  //   console.log('createUserDto---', createUserDto);
  //   return this.prisma.user.create({ data: createUserDto });
  // }

  // TODO: 方法二：创建dto
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    const [total, data] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.findMany(),
    ]);
    return { total, data };
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
