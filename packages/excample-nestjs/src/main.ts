import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetupModule } from './setup/setup.module';
import { getPortPromise } from 'portfinder';

async function bootstrap() {
  const port = await getPortPromise({ port: 3000 });
  const app = await NestFactory.create(AppModule);

  await app.get(SetupModule).setup(app);

  // 默认情况下，NestJS 不侦听系统进程终止信号（例如 SIGTERM）。因此，如果进程终止，MikroORM 关闭逻辑将永远不会执行，这可能导致数据库连接保持打开状态并消耗资源。
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(port);

  console.log(`应用启动: http://localhost:${port}`);
}

bootstrap();
