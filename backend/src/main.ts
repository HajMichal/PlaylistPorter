import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      process.env.CLIENT_URL,
      'http://localhost:3000/auth/google',
      'http://localhost:3000',
      'http://localhost:3000/auth/google/callback',
    ],
    allowedHeaders: ['content-type'],
  });
  await app.listen(process.env.PORT);
}
bootstrap();
