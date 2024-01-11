export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** 环境 */
      NODE_ENV: 'development' | 'production';

      /** 数据库 */
      DATABASE_MYSQL_URL: string;
      DATABASE_MYSQL_DB_NAME: string;

      /** REDIS */
      REDIS_HOST: string;
      REDIS_PORT: string;

      /** JWT */
      JWT_EXPIRESIN: string;
      JWT_SECRET: string;
    }
  }
}
