
// PRODUCT MODULE

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schema/product.schema";
import { ProductController } from "./controller/product.controller";
import { ProductService } from "./service/product.service";
import { Category, CategorySchema } from "../category/schema/category.schema";

@Module({
    imports: [
        // REGISTER COLLECTION
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Category.name, schema: CategorySchema }
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }