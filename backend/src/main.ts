import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  console.log('http://localhost:' + process.env.PORT);
}
bootstrap();
