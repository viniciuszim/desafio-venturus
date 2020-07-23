import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as swStats from 'swagger-stats';

import { AppModule } from './app.module';

// Express
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .use(helmet())
    // swagger statistics
    .use(swStats.getMiddleware({}))
    // compression
    .use(compression())
    // Cors
    .enableCors();

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Nest boilerplate')
    .setDescription('NestJs API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
