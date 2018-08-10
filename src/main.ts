import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(logger('dev'));
  await app.listen(3000);
}
bootstrap();
