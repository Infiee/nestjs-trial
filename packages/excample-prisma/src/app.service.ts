import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import dayjs from 'dayjs';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      take: 5,
      skip: 0,
      where: {
        username: {
          in: ['小王0', '小王3', '小王5'],
        },
      },
    });
    return users;
  }

  create() {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        username: '小王' + i,
        password: '123456' + i,
        nickname: '王公子' + i,
        email: `123_${i}@qq.com`,
        phone: `135540757${i}1`,
        createdTime: dayjs().valueOf(),
        updatedTime: dayjs().valueOf(),
      });
    }
    return this.prisma.user.createMany({
      data: data,
      // skipDuplicates: true,
    });
  }
}
