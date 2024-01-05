declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_PG_URL: string;

    REDIS_HOST: string;
    REDIS_PORT: string;

    JWT_EXPIRESIN: string;
    JWT_SECRET: string;
    // JWT_SECRET?: string;
  }
}
