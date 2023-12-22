"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const nestjs_prisma_1 = require("nestjs-prisma");
const core_1 = require("@nestjs/core");
const all_exception_filter_1 = require("./filters/all-exception.filter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_prisma_1.PrismaModule.forRoot({
                prismaServiceOptions: {
                    middlewares: [
                        async (params, next) => {
                            const result = await next(params);
                            console.log('params123---', JSON.stringify(params, null, 2));
                            console.log('result213---', result);
                            return result;
                        },
                    ],
                },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.AllExceptionFilter,
            },
            (0, nestjs_prisma_1.providePrismaClientExceptionFilter)({
                P2000: common_1.HttpStatus.BAD_REQUEST,
                P2002: common_1.HttpStatus.CONFLICT,
                P2025: common_1.HttpStatus.NOT_FOUND,
            }),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map