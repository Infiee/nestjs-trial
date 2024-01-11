export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** 环境 */
      NODE_ENV: 'development' | 'production';

      /** 数据库 */
      DATABASE_PG_URL: string;

      /** REDIS */
      REDIS_HOST: string;
      REDIS_PORT: string;

      /** JWT */
      JWT_EXPIRESIN: string;
      JWT_SECRET: string;
    }
  }
}
