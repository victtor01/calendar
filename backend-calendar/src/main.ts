import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname ,'../uploads'), {prefix: '/uploads'})
  app.enableCors();
  await app.listen(8000);
  
}
bootstrap();
