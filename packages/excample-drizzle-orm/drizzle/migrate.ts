import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import config from '../drizzle.config';
import { createConnection } from 'mysql2';

async function run() {
  const connection = await createConnection(config.dbCredentials);
  const db = drizzle(connection);
  await migrate(db, { migrationsFolder: './drizzle/migration' });
  await connection.end();
}

// 执行sql迁移
run();
