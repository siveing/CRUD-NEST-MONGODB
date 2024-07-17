import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../product/schema/product.schema';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { Category } from '../schema/category.schema';
import { SocketGateway } from 'src/libs/socket/socket.gateway';

@Injectable()
export class CategoryService {

    // GET COLLECTIONS INSTANCE
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        @InjectModel(Product.name) private productModel: Model<Product>,

        private socketGatewat: SocketGateway,
    ) { }

    /**
     * Find all categories
     * @returns 
     */
    async findAll() {
        const resultCategories = await this.categoryModel.find();

        this.socketGatewat.emit("getCategories", {
            data: resultCategories
        });

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

        // CHECK IF CATEGORY HAS USED BY ANY PRODUCT
        const isUsed = await this.productModel.findOne({ categoryId: id });
        if (isUsed) {
            return {
                message: 'Category is used by some product, cannot delete',
                success: false,
                data: null
            }
        }

        await this.categoryModel.findByIdAndDelete(id);

        return {
            message: 'Category deleted successfully',
            success: true,
            data: id
        }
    }
}
