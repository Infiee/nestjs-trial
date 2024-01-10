import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export default (app: INestApplication) => {
  app.use(helmet());
  app.enableCors();
};
