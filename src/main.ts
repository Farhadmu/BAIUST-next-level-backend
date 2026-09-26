import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global API Prefix
  app.setGlobalPrefix('api/v1');

  // Input Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger OpenAPI Documentation
  const config = new DocumentBuilder()
    .setTitle('CSE HUB API')
    .setDescription('Enterprise REST API for University CSE Digital Ecosystem')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`[CSE HUB API] Server initialized on http://localhost:${port}/api/v1`);
  console.log(`[CSE HUB API] Interactive Swagger Docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
