import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto extends UserEntity {
  @ApiProperty({ description: '用户名', example: 'test' })
  username: string;

  @ApiProperty({ description: '邮箱', example: 'test@test.com' })
  email: string;

  @ApiProperty({ description: '密码', example: 'test' })
  password: string;
}
