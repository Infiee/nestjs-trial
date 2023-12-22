import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<{
        items: import("@mikro-orm/core").Loaded<User, never>[];
        total: number;
    }>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<User, never>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("@mikro-orm/core").Loaded<User, never>>;
    batchUpdate(batchUpdateUserDto: User[]): Promise<import("@mikro-orm/core").Loaded<User, never>[]>;
    remove(id: string): Promise<import("@mikro-orm/core").Loaded<User, never>>;
}
