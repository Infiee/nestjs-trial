import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity, responseUserSchema } from './entities/user.entity';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

@ApiTags('用户')
// TODO: 自动校验dto类型，不符合就抛出错误信息
// 如果觉得ZodValidationPipe返回的校验信息不符合需求，可以自己创建一个自定义的ZodValidationPipe
@UsePipes(ZodValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: UserEntity })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return responseUserSchema.parse(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
