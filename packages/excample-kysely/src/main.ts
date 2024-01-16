import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: 修复bigint错误
BigInt.prototype.toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
