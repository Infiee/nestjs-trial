import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityRepository } from '@mikro-orm/core';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: EntityRepository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<{
        items: import("@mikro-orm/core").Loaded<User, never>[];
        total: number;
    }>;
    findOne(id: number): Promise<import("@mikro-orm/core").Loaded<User, never>>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("@mikro-orm/core").Loaded<User, never>>;
    batchUpdate(batchUpdateUserDto: User[]): Promise<import("@mikro-orm/core").Loaded<User, never>[]>;
    remove(id: number): Promise<import("@mikro-orm/core").Loaded<User, never>>;
}
