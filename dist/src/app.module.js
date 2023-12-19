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
const schema = require("../drizzle/schema");
const nestjs_drizzle_mysql2_1 = require("@knaadh/nestjs-drizzle-mysql2");
const core_1 = require("@nestjs/core");
const all_exception_filter_1 = require("./filters/all-exception.filter");
const users_module_1 = require("./users/users.module");
const nestjs_zod_1 = require("nestjs-zod");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_drizzle_mysql2_1.DrizzleMySqlModule.registerAsync({
                tag: 'DB_PROD',
                useFactory() {
                    return {
                        mysql: {
                            connection: 'client',
                            config: {
                                host: '127.0.0.1',
                                user: 'root',
                                password: 'root',
                                database: 'test_drizzle_db',
                            },
                        },
                        config: { schema: { ...schema }, mode: 'default' },
                    };
                },
            }),
            users_module_1.UsersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_PIPE,
                useClass: nestjs_zod_1.ZodValidationPipe,
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map