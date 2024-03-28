import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from '@modules/product/product.module';

@Module({
    imports: [

        // MONGO DB CONNECTION
        MongooseModule.forRoot('mongodb://localhost:27017/CRUD-Nest-MongoDB'),

        // MODULES
        CategoryModule,
        ProductModule

    ],
    controllers: [AppController],
})
export class AppModule { }
