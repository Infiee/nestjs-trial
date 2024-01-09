import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    return {
      id: 1,
      username: 'testUser',
      password: 'securePassword',
      email: 'testuser@example.com',
      created_at: new Date(),
      update_at: new Date(),
      test: 'testData',
    };
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
