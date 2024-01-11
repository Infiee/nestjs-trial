import { INestApplication, Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/app-config.module';
import { DatabaseModule } from 'src/setup/database/database.module';
import { SwaggerDocModule } from './swagger-doc/swagger-doc.module';
import security from './security/security';

@Module({
  imports: [AppConfigModule, DatabaseModule, SwaggerDocModule],
})
export class SetupModule {
  async setup(app: INestApplication) {
    await app.get(SwaggerDocModule).setup(app);
    security(app);
  }
}
