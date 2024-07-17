import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from '@modules/product/product.module';
import { ConfigModule as CoreConfigModule, configEnv } from '@core/config';
import { ConfigModule } from '@nestjs/config';
import { LibCacheModule } from './libs/cache/cache.module';

@Module({
    imports: [
        LibCacheModule,

        // CONFIG MODULE
        ConfigModule.forRoot({ isGlobal: true, validate: configEnv }),
        CoreConfigModule,

        // MONGO DB CONNECTION
        MongooseModule.forRoot(process.env.MONGO_URI || '', { dbName: process.env.MONGO_DB_NAME }),

        // MODULES
        CategoryModule,
        ProductModule
    ],
    controllers: [AppController],
})

export class AppModule { }
