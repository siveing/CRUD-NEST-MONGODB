
// PRODUCT CONTROLLER

import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "../service/product.service";
import { CreateProductDto, UpdateProductDto, UpdateProductStockDto } from "../dto/product.dto";

@Controller('product')
@ApiTags('Product')
export class ProductController {

    // SERVICE REGISTER
    constructor(private readonly productService: ProductService) { }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Post()
    create(@Body() data: CreateProductDto) {
        return this.productService.create(data);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() data: UpdateProductDto) {
        return this.productService.update(id, data);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.productService.delete(id);
    }

    @Patch(":id/increase/stock")
    increaseStock(@Param('id') id: string, @Body() data: UpdateProductStockDto) {
        return this.productService.increaseStock(id, data);
    }

    @Patch(":id/decrease/stock")
    decreaseStock(@Param('id') id: string, @Body() data: UpdateProductStockDto) {
        return this.productService.decreaseStock(id, data);
    }
}