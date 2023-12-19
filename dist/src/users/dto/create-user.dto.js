"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const z_1 = require("nestjs-zod/z");
const UserSchema = z_1.z.object({
    username: z_1.z.string({
        required_error: "请输入用户名",
        invalid_type_error: "用户名参数错误",
    }),
    password: z_1.z.string({
        required_error: "请输入密码",
        invalid_type_error: "请输入6-12位密码",
    }),
    email: z_1.z.string().email({
        message: "请输入正确的邮箱",
    }),
});
class CreateUserDto extends (0, nestjs_zod_1.createZodDto)(UserSchema) {
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map