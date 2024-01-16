import * as path from 'path';
import { createPool } from 'mysql2';
import { promises as fs } from 'fs';
import { Kysely, Migrator, FileMigrationProvider, MysqlDialect } from 'kysely';

async function migrateToLatest() {
  const db = new Kysely<any>({
    dialect: new MysqlDialect({
      pool: createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'test_kysely',
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path1.
      migrationFolder: path.join(__dirname, 'migrations'),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

// migrateToLatest();
