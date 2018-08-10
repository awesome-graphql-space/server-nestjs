import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appModule = app.get(AppModule);
  // appModule.configureGraphQL(app);
  // await app.listen(3000); 
  
  const httpServer = app.getHttpServer();
  appModule.configureGraphQL(app, httpServer); 
  await app.listen(3000); 
}
bootstrap();
