import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: 放在前面是为了防止和后面的路由规则产生冲突
  // 批量插入
  @Post('/batch')
  batchCreate(@Body() body: { users: User[] }) {
    return this.usersService.batchCreate(body.users);
  }

  // 批量更新
  @Patch('/batch')
  batchUpdate(@Body() batchUpdateUserDto: User[]) {
    return this.usersService.batchUpdate(batchUpdateUserDto);
  }

  // 批量插入
  @Delete('/batch')
  batchRemove(@Body() body: { ids: number[] }) {
    return this.usersService.batchRemove(body.ids);
  }

  // TODO: 放在后面是为了防止和前面的批量路由规则产生冲突
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
