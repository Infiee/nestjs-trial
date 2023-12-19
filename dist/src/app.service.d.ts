import * as schema from "../drizzle/schema";
import { MySql2Database } from "drizzle-orm/mysql2";
export declare class AppService {
    private drizzleProd;
    constructor(drizzleProd: MySql2Database<typeof schema>);
    getHello(): string;
    dbMigrate(): void;
}
