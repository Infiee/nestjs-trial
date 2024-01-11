export default () => ({
  // swagger
  swagger: {
    enable: process.env.SWAGGER_ENABLE,
  },
  // dababase
  database: {
    url: process.env.DATABASE_MYSQL_URL,
  },
  // redis
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
