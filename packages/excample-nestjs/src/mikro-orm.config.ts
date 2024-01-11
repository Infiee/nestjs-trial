import dotenv from 'dotenv';
import { defineConfig } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
// 实体生成器
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';
// import { logger } from '@mikro-orm/nestjs';

// dotenv.config()
// if (process.env.NODE_ENV === 'development') {
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
// }

export default defineConfig({
  dbName: process.env.DATABASE_MYSQL_DB_NAME,
  clientUrl: process.env.DATABASE_MYSQL_URL,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  // logger: logger.log.bind(logger),
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,

  extensions: [Migrator, EntityGenerator, SeedManager],
});
