import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('用户')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ type: User })
  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto---', createUserDto);
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

  // 软删除
  @Patch(':id/soft-delete')
  softRemove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // 软恢复
  @Patch(':id/soft-recover')
  softRecover(@Param('id') id: string) {
    return this.usersService.recover(+id);
  }

  // 批量插入
  @Post('/batch')
  batchInsert(@Body() data: { users: CreateUserDto[] }) {
    return this.usersService.batchInsert(data.users);
  }

  // 批量更新
  // @Post('/batchs')
  // batchUpdate(@Body() data: { ids: number[]; userData: CreateUserDto }) {
  //   return this.usersService.batchUpdate(data.ids, data.userData);
  // }
  @Post('/batchs')
  batchUpdate(@Body() data: { users: User[] }) {
    return this.usersService.batchUpdate(data.users);
  }
}
