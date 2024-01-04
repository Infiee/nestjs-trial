import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getPortPromise } from 'portfinder';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const setupSwagger = (app) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Mikro-ORM-Api')
    .setDescription('Mikro-ORM的API文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // 这里的api就是访问的路径，比如 http://localhost:4000/openapi
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
  console.log(`应用启动: http://localhost:${port}`);
}
bootstrap();
