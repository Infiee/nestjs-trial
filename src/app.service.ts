import { Inject, Injectable } from "@nestjs/common";
import * as schema from "../drizzle/schema";
import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import { users } from "../drizzle/schema";
// import { insertUserSchema, users } from '../db/schema';
// import { SafeParseError, ZodError, ZodErrorMap } from 'zod';

import { migrate } from "drizzle-orm/mysql2/migrator";

@Injectable()
export class AppService {
  constructor(
    @Inject("DB_PROD") private drizzleProd: MySql2Database<typeof schema>
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  dbMigrate() {
    migrate(this.drizzleProd, { migrationsFolder: "./db/drizzle" });
  }
}
