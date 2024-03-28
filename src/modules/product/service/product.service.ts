// PRODUCT SERVICE

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schema/product.schema';
import { CreateProductDto, UpdateProductDto, UpdateProductStockDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    /**
     * Find all products
     */
    async findAll() {
        const resultProducts = await this.productModel.find().populate({ path: 'categoryId' });
        return {
            message: 'All products',
            success: true,
            data: resultProducts
        }
    }

    /**
    * Create Product
    * @param data
    */
    async create(data: CreateProductDto) {
        const resultCreated = await this.productModel.create(data);

        return {
            message: 'Product created',
            success: true,
            data: resultCreated
        }
    }

    /**
     * Update product information
     * @param id
     * @param data
     */
    async update(id: string, data: UpdateProductDto) {
        try {
            const resultUpdated = await this.productModel.findByIdAndUpdate(id, data, { new: true });
            if (!resultUpdated) {
                // Handle case when document with the given id is not found
                return {
                    message: 'Product not found',
                    success: false,
                    data: null
                };
            }

            return {
                message: 'Product updated',
                success: true,
                data: resultUpdated
            }
        } catch (error) {
            throw error;
        }

    }

    /**
     * Delete product
     * @param id string
     */
    async delete(id: string) {
        await this.productModel.findByIdAndDelete(id);

        return {
            message: 'Product deleted successfully',
            success: true,
            data: id
        }
    }

    async increaseStock(id: string, data: UpdateProductStockDto) {
        try {
            const resultIncreased = await this.productModel.findByIdAndUpdate(id, { $inc: { stock: +data.stock } }, { new: true });
            if (!resultIncreased) {
                // Handle case when document with the given id is not found
                return {
                    message: 'Product not found',
                    success: false,
                    data: null
                };
            }

            return {
                message: 'Product stock increased successfully',
                success: true,
                data: resultIncreased
            };

        } catch (error) {
            throw error;
        }
    }

    async decreaseStock(id: string, data: UpdateProductStockDto) {
        try {
            const resultDecreased = await this.productModel.findByIdAndUpdate(id, { $inc: { stock: -data.stock } }, { new: true });
            if (!resultDecreased) {
                // Handle case when document with the given id is not found
                return {
                    message: 'Product not found',
                    success: false,
                    data: null
                };
            }

            return {
                message: 'Product stock decreased successfully',
                success: true,
                data: resultDecreased
            };

        } catch (error) {
            throw error;
        }
    }
}

