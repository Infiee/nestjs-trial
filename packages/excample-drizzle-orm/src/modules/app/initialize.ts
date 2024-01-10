import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from '@fastify/helmet';

const setupSwagger = (app: NestFastifyApplication) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nestjs-Api')
    .setDescription('Nestjs的API文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // 这里的api就是访问的路径，比如 http://localhost:3000/openapi
  SwaggerModule.setup('openapi', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};

export const initialize = async (app: NestFastifyApplication) => {
  // 安全
  await app.register(helmet);

  // 跨域
  app.enableCors();

  // swagger openapi
  setupSwagger(app);
};
