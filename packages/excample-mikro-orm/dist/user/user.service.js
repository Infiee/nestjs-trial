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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_1 = require("@mikro-orm/nestjs");
const user_entity_1 = require("./entities/user.entity");
const core_1 = require("@mikro-orm/core");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const user = await this.userRepository.create(createUserDto);
        await this.userRepository.getEntityManager().flush();
        return user;
    }
    async findAll() {
        const [items, total] = await this.userRepository.findAndCount({}, { limit: 10, offset: 0 });
        return {
            items,
            total,
        };
    }
    findOne(id) {
        return this.userRepository.findOneOrFail(id);
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOneOrFail(id);
        const updateUser = (0, core_1.wrap)(user).assign(updateUserDto);
        await this.userRepository.getEntityManager().flush();
        return updateUser;
    }
    async batchUpdate(batchUpdateUserDto) {
        const ids = batchUpdateUserDto.map((item) => item.id);
        const users = await this.userRepository.find({
            id: {
                $in: ids,
            },
        });
        for (const user of users) {
            const item = batchUpdateUserDto.find((item) => item.id == user.id);
            if (item) {
                Object.assign(user, item);
            }
        }
        await this.userRepository.getEntityManager().flush();
        return users;
    }
    async remove(id) {
        const user = await this.userRepository.findOneOrFail(id);
        await this.userRepository.getEntityManager().remove(user).flush();
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [core_1.EntityRepository])
], UserService);
//# sourceMappingURL=user.service.js.map