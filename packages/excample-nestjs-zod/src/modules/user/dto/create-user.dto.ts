import { createZodDto } from '@anatine/zod-nestjs';
import { userSchema } from '../entities/user.entity';

export class CreateUserDto extends createZodDto(userSchema) {}
