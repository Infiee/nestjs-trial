import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetupModule } from './setup/setup.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.get(SetupModule).setup(app);

  await app.listen(3000);
}

bootstrap();
