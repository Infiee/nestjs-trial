"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("@mikro-orm/mysql");
const sql_highlighter_1 = require("@mikro-orm/sql-highlighter");
const reflection_1 = require("@mikro-orm/reflection");
const migrations_1 = require("@mikro-orm/migrations");
const entity_generator_1 = require("@mikro-orm/entity-generator");
const seeder_1 = require("@mikro-orm/seeder");
exports.default = (0, mysql_1.defineConfig)({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    dbName: 'test_mikro',
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    debug: true,
    highlighter: new sql_highlighter_1.SqlHighlighter(),
    metadataProvider: reflection_1.TsMorphMetadataProvider,
    registerRequestContext: false,
    extensions: [migrations_1.Migrator, entity_generator_1.EntityGenerator, seeder_1.SeedManager],
});
//# sourceMappingURL=mikro-orm.config.js.map