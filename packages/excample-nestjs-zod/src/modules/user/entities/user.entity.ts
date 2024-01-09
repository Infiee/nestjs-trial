import { z } from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { ApiProperty } from '@nestjs/swagger';

extendZodWithOpenApi(z);

export const userSchema = z.object({
  username: z
    .string({
      required_error: '请输入用户名',
      invalid_type_error: '用户名参数错误',
    })
    .min(1, { message: '请输入用户名' })
    .openapi({
      example: '测试用户',
    }),
  password: z.string().min(1, { message: '请输入密码' }),
  email: z.string().email({ message: '请输入正确的邮箱地址' }),
  age: z.number().optional(),
});

// export type User = z.infer<typeof userSchema>;

export const responseUserSchema = userSchema.omit({
  password: true,
});

export class UserEntity extends createZodDto(responseUserSchema) {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  update_at: Date;
}
