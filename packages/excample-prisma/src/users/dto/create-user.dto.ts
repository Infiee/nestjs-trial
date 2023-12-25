import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const UserSchema = z.object({
  username: z.string({
    required_error: '请输入用户名',
    invalid_type_error: '用户名参数错误',
  }),
  password: z.string({
    required_error: '请输入密码',
    invalid_type_error: '请输入6-12位密码',
  }),
  // .refine((value) => /^(?=.*[A-Z]).+&/g.test(value), {
  //   message: '至少需要一个大写字母',
  // })
  // .refine((value) => /^(?=.*[0-9]).+$/g.test(value), '至少需要一个数字')
  // .refine(
  //   (value) => /^(?=.*[^a-zA-Z0-9]).+$/g.test(value),
  //   '至少需要一个符号',
  // ),
  email: z
    .string({
      required_error: '请输入邮箱',
    })
    .email({
      message: '请输入正确的邮箱',
    }),
});

// class is required for using DTO as a type
export class CreateUserDto extends createZodDto(UserSchema) {}
