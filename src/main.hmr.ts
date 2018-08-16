import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as cors from 'cors';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(cors());
await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
