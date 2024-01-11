import { INestApplication, Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Module({})
export class SwaggerDocModule {
  setup(app: INestApplication) {
    const configService = app.get(ConfigService);
    // 如果不开启swagger
    console.log('configService', configService.get('swagger.enable'));
    if (configService.get('swagger.enable') !== 'true') {
      return;
    }

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
  }
}
