import 'dotenv/config';
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocument } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@core/config';

async function bootstrap() {
  // CREATE APPLICATION
  const app = await NestFactory.create(AppModule);

  // SET THE APPLICATION CONFIG ENVIRONMENT
  const config = app.get(ConfigService);

  // SWAGGER DOCUMENET
  SwaggerDocument(app);

  // CLASS VALIDATOR OR DTO VALIDATOR
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    },
    forbidNonWhitelisted: false,
    errorHttpStatusCode: 422
  }));

  // PREFIX
  // app.setGlobalPrefix('api/v1');

  const port = config.get('APPLICATION_PORT');
  await app.listen(port, () => console.log(`Port has listen: ${port}`));
}
bootstrap();
