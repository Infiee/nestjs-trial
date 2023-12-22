"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = require("drizzle-orm/mysql2");
const migrator_1 = require("drizzle-orm/mysql2/migrator");
const drizzle_config_1 = require("../drizzle.config");
const mysql2_2 = require("mysql2");
async function run() {
    const connection = await (0, mysql2_2.createConnection)(drizzle_config_1.default.dbCredentials);
    const db = (0, mysql2_1.drizzle)(connection);
    await (0, migrator_1.migrate)(db, { migrationsFolder: './drizzle/migration' });
    await connection.end();
}
run();
//# sourceMappingURL=migrate.js.map