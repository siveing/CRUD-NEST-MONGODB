import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocument } from './swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  // CREATE APPLICATION
  const app = await NestFactory.create(AppModule);

  // SWAGGER DOCUMENET
  SwaggerDocument(app);

  // CLASS VALIDATOR OR DTO VALIDATOR
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, () => console.log("Port has listen: 3000"));
}
bootstrap();
