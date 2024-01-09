import { createZodDto } from '@anatine/zod-nestjs';
import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const userSchema = z.object({
  username: z
    .string({
      required_error: '请输入用户名',
      invalid_type_error: '用户名参数错误',
    })
    .min(1, { message: '请输入用户名' }),
  password: z.string().min(1, { message: '请输入密码' }),
  email: z.string().email({ message: '请输入正确的邮箱地址' }),
});

// export type User = z.infer<typeof userSchema>;

export const userResponseSchema = userSchema.omit({
  password: true,
});

export class UserEntity extends createZodDto(userResponseSchema) {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  update_at: Date;
}

export class CreateUserDto extends createZodDto(userSchema) {}

export class UpdateUserDto extends createZodDto(userSchema) {}
