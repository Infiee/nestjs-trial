import { z } from 'nestjs-zod/z';
declare const CreateUserDto_base: import("nestjs-zod").ZodDto<{
    password: string;
    username: string;
    email: string;
}, z.ZodObjectDef<{
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    password: string;
    username: string;
    email: string;
}>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};
