import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'test' })
  username: string;

  @ApiProperty({ description: '邮箱', example: 'test@test.com' })
  email: string;

  @ApiProperty({ description: '密码', example: 'test' })
  password: string;
}
