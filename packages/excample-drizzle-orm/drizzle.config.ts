import type { Config } from 'drizzle-kit';

export default {
  schema: './drizzle/schema/*.ts',
  out: './drizzle/migration',
  driver: 'mysql2',
  dbCredentials: {
    user: 'root',
    password: 'root',
    host: '127.0.0.1',
    port: 3306,
    database: 'test_drizzle_db',
  },
  verbose: true,
} satisfies Config;
