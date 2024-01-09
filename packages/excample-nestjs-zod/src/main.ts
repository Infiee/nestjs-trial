import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { getPortPromise } from 'portfinder';

import { AppModule } from './app.module';

const setupSwagger = (app) => {
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

async function bootstrap() {
  const port = await getPortPromise({ port: 3000 });

  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(port);

  console.log(`服务运行在: http://localhost:${port}`);
}

bootstrap();
