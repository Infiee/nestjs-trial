import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'test' })
  @IsNotEmpty({ message: '请输入用户名' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: '请输入密码' })
  @Matches(passwordRegexp, {
    message: '请输入包含大、小写字母、数字、特殊字符且不少于8个字符组合的密码',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: '请输入邮箱' })
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsEnum(['Male', 'Female', 'Non-Binary'])
  gender?: string;
}
