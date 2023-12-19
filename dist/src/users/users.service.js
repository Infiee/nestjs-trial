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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const schema = require("../../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
let UsersService = class UsersService {
    constructor(drizzleProd) {
        this.drizzleProd = drizzleProd;
    }
    create(createUserDto) {
        console.log("createUserDto---", createUserDto);
        return this.drizzleProd.insert(schema.users).values(createUserDto);
    }
    findAll() {
        const statement = (0, drizzle_orm_1.sql) `
      SELECT
        COUNT(*) AS count,
        JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', name, 'password', password, 'email', email, 'create_time', create_time, 'update_time', update_time, 'test', test, 'test_update', test_update)) AS data
      FROM
        users;
    `;
        return this.drizzleProd.execute(statement);
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return this.drizzleProd
            .update(schema.users)
            .set(updateUserDto)
            .where((0, drizzle_orm_1.eq)(schema.users.id, id));
    }
    async remove(id) {
        const response = await this.drizzleProd.transaction(async (tx) => {
            const insertedUser = this.drizzleProd.insert(schema.users).values({
                username: "My Name",
                password: "My Password",
                email: "My Email",
            });
            console.log('insertedUser---', insertedUser);
            const insertedId = insertedUser[0].id;
            const insertedPosts = this.drizzleProd.insert(schema.posts).values([
                { content: "My Title 1", authorId: insertedId },
                { content: "My Title 2", authorId: insertedId },
            ]);
            return [insertedUser, insertedPosts];
        });
        return response;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("DB_PROD")),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map