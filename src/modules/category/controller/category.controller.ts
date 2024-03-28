import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Post()
    create(@Body() data: CreateCategoryDto) {
        return this.categoryService.create(data);
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
        return this.categoryService.update(id, data);
    }

    @Delete(":id")
    delete(@Param('id') id: string) {
        return this.categoryService.delete(id);
    }
}

