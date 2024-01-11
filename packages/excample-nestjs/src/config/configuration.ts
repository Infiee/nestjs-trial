export default () => ({
  // swagger
  swagger: {
    enable: process.env.SWAGGER_ENABLE,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
