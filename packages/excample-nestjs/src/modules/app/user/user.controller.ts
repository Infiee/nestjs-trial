import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  ApiOperation,
  ApiPropertyOptional,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

export class CursorQueryDto {
  @ApiPropertyOptional()
  cursorId?: string;
}

export class PaginationQueryDto {
  @ApiPropertyOptional()
  limit: string = '10';

  @ApiPropertyOptional()
  offset: string = '0';
}

@ApiTags('用户')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // TODO: 放在前面是为了防止和后面的路由规则产生冲突
  // 批量插入
  @Post('/batch')
  batchCreate(@Body() body: { users: User[] }) {
    return this.usersService.batchCreate(body.users);
  }

  // 批量更新
  @Patch('/batch')
  batchUpdate(@Body() body: { users: User[] }) {
    return this.usersService.batchUpdate(body.users);
  }

  // 批量删除
  @Delete('/batch')
  batchRemove(@Body() body: { ids: number[] }) {
    return this.usersService.batchRemove(body.ids);
  }

  // TODO: 放在后面是为了防止和前面的批量路由规则产生冲突
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({ type: User })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get('/cursor')
  findAllCursor(@Query() query: CursorQueryDto) {
    return this.usersService.findAllCursor(
      query.cursorId ? +query.cursorId : 0,
    );
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
