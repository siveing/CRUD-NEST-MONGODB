// CATEGORY MODULE 

import { Module } from "@nestjs/common";
import { CategoryController } from "./controller/category.controller";
import { CategoryService } from "./service/category.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./schema/category.schema";
import { Product, ProductSchema } from "@modules/product/schema/product.schema";

@Module({
    imports: [
        // REGISTER COLLECTION
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: Product.name, schema: ProductSchema }
        ])
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: []
})

export class CategoryModule { }