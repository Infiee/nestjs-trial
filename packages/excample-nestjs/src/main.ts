import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetupModule } from './setup/setup.module';
import { getPortPromise } from 'portfinder';

async function bootstrap() {
  const port = await getPortPromise({ port: 3000 });
  const app = await NestFactory.create(AppModule);

  await app.get(SetupModule).setup(app);

  await app.listen(port);

  console.log(`应用启动: http://localhost:${port}`);
}

bootstrap();
