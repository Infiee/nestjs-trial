import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  console.log('env---', process.env.NODE_ENV);
  dotenv.config({
    path: '.env.development',
  });
}

// console.log('dd----', process.env.DATABASE_PG_URL);

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migration',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_PG_URL,
  },
  verbose: true,
} satisfies Config;
