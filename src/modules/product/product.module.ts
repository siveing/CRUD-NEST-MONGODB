
// PRODUCT MODULE

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schema/product.schema";
import { ProductController } from "./controller/product.controller";
import { ProductService } from "./service/product.service";

@Module({
    imports: [
        // REGISTER COLLECTION
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }