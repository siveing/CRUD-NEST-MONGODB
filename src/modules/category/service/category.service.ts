import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schema/category.schema';

@Injectable()
export class CategoryService {

    // GET COLLECTIONS INSTANCE
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }

    /**
     * Find all categories
     * @returns 
     */
    async findAll() {
        const resultCategories = await this.categoryModel.find();

        return {
            message: 'All categories',
            success: true,
            data: resultCategories
        }
    }

    /**
     * Create category
     * @param data
     */
    async create(data: CreateCategoryDto) {
        const resultCreated = await this.categoryModel.create(data);

        return {
            message: 'Category created',
            success: true,
            data: resultCreated
        }
    }

    /**
     * Update category
     * @param id
     * @param data
     */
    async update(id: string, data: UpdateCategoryDto) {
        try {
            const resultUpdated = await this.categoryModel.findByIdAndUpdate(id, data, { new: true });
            if (!resultUpdated) {
                // Handle case when document with the given id is not found
                return {
                    message: 'Category not found',
                    success: false,
                    data: null
                };
            }
            return {
                message: 'Category updated',
                success: true,
                data: resultUpdated
            };
        } catch (e) {
            throw e;
        }
    }

    /**
     * Delete Category
     * @param id
     */
    async delete(id: string) {
        await this.categoryModel.findByIdAndDelete(id);

        return {
            message: 'Category deleted successfully',
            success: true,
            data: id
        }
    }
}
