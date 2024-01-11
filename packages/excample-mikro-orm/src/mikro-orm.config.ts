import { defineConfig } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';
// import { logger } from '@mikro-orm/nestjs';

export default defineConfig({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  dbName: 'test_mikro',
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  debug: true,
  // logger: logger.log.bind(logger),
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
  extensions: [Migrator, EntityGenerator, SeedManager],
});
