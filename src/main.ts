import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './core/exception';

async function server() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1', {
    exclude : ['/']
  })

  app.useGlobalFilters(new AllExceptionsFilter)
  app.useGlobalPipes(new ValidationPipe)

  await app.listen(process.env.PORT);
}

server();
