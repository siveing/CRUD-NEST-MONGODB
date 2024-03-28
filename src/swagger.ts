// SwaggerModule

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerDocument = (app: INestApplication) => {
    const options = new DocumentBuilder()
        .setTitle('CRUD with MongoDB')
        .setDescription("Testing CRUD with MongoDB")
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();

    const documents = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('/docs', app, documents);
};
