"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const dayjs_1 = __importDefault(require("dayjs"));
let AppService = class AppService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            take: 5,
            skip: 0,
            where: {
                username: {
                    in: ['小王0', '小王3', '小王5'],
                },
            },
        });
        return users;
    }
    create() {
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                username: '小王' + i,
                password: '123456' + i,
                nickname: '王公子' + i,
                email: `123_${i}@qq.com`,
                phone: `135540757${i}1`,
                createdTime: (0, dayjs_1.default)().valueOf(),
                updatedTime: (0, dayjs_1.default)().valueOf(),
            });
        }
        return this.prisma.user.createMany({
            data: data,
        });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], AppService);
//# sourceMappingURL=app.service.js.map