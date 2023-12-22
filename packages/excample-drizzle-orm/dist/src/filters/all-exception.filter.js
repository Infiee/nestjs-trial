"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        if (exception instanceof common_1.HttpException) {
            this.catchHttpException(exception, host);
        }
        else if (exception instanceof zod_1.ZodError) {
            this.catchZodException(exception, host);
        }
        else if (exception instanceof nestjs_zod_1.ZodValidationException) {
            this.catchZodValidationException(exception, host);
        }
        else {
            this.catchException(exception, host);
        }
    }
    catchException(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        console.log('exception--', exception);
        response.status(common_1.HttpStatus.BAD_REQUEST).json({
            code: -1,
            message: '捕获异常',
            error: exception
        });
    }
    catchHttpException(exception, host) {
        if (exception instanceof nestjs_zod_1.ZodValidationException) {
            this.catchZodValidationException(exception, host);
            return;
        }
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        response.status(status).json({
            code: status,
            message: exception.message,
        });
    }
    catchZodException(exception, host) {
        console.log('命中了', exception.errors[0].message);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        console.log('zod exception--', exception.flatten().fieldErrors);
        response.status(common_1.HttpStatus.BAD_REQUEST).json({
            code: -1,
            message: exception.flatten().fieldErrors,
        });
    }
    catchZodValidationException(exception, host) {
        console.log('命中了catchZodValidationException', exception.getZodError());
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(common_1.HttpStatus.BAD_REQUEST).json({
            code: -1,
            message: '请求失败',
            error: exception.getZodError().flatten().fieldErrors
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exception.filter.js.map