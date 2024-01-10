import { INestApplication, Module } from '@nestjs/common';
import { SwaggerDocModule } from './swagger-doc/swagger-doc.module';
import security from './security/security';

@Module({
  imports: [SwaggerDocModule],
})
export class SetupModule {
  async setup(app: INestApplication) {
    await app.get(SwaggerDocModule).setup(app);
    security(app);
  }
}
