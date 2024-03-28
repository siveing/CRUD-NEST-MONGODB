// TESTING PRODUCT

import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Product } from "../schema/product.schema";
import { ProductController } from "./product.controller";
import { ProductService } from "../service/product.service";
import { CreateProductDto, UpdateProductDto, UpdateProductStockDto } from "../dto/product.dto";
import { Category } from "../../category/schema/category.schema";


// Mock Product Model
const mockProductModel = {
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
};

const mockCategoryModel = {
    findById: jest.fn()
};

describe('Product Controller', () => {
    let productController: ProductController;
    let productService: ProductService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                ProductService,
                // Provide the mock for productModel
                { provide: getModelToken(Product.name), useValue: mockProductModel },
                { provide: getModelToken(Category.name), useValue: mockCategoryModel },
            ],
        }).compile();

        productService = app.get<ProductService>(ProductService)
        productController = app.get<ProductController>(ProductController);
    });

    it('productController, productService should be defined', () => {
        expect(productService).toBeDefined();
        expect(productController).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of product"', () => {
            const result = {
                message: "All products",
                data: [
                    {
                        "name": "Coca Cola",
                        "description": "hello this description for drink",
                        "categoryId": "any",
                        "price": 4000,
                        "stock": 10

                    } as CreateProductDto,
                ]
            };

            // MOCK METHOD
            jest.spyOn(productService, 'findAll').mockImplementation(() => result as any);

            expect(productController.findAll()).toEqual(result);
        });
    });

    describe('create', () => {

        it('should return message error when no category exist', async () => {
         
            mockCategoryModel.findById = jest.fn().mockResolvedValue(false);

            const messageCategoryNotExist = {
                "data": null,
                "message": "Category Not found",
                "success": false,
            }

            const data: CreateProductDto = {
                name: 'Siveing',
                description: 'Siveing description',
                categoryId: 'any',
                price: 4000,
                stock: 10
            }

            mockProductModel.create.mockResolvedValueOnce(data);

            const result = await productController.create(data);
            expect(result).toEqual(messageCategoryNotExist);
        });

        it('should return an object of product created"', async () => {

            mockCategoryModel.findById = jest.fn().mockResolvedValue(true);

            const data: CreateProductDto = {
                name: 'Siveing',
                description: 'Siveing description',
                categoryId: 'any',
                price: 4000,
                stock: 10
            }

            const resultResponse = {
                message: 'Product created',
                success: true,
                data
            }

            mockProductModel.create.mockResolvedValueOnce(data);

            const result = await productController.create(data);
            expect(result).toEqual(resultResponse);
        });
    });

    describe('update', () => {
        it('should return an object of product updated"', async () => {

            mockCategoryModel.findById = jest.fn().mockResolvedValue(true);

            const productId = 'existingProductId';
            const data: UpdateProductDto = {
                name: 'Siveing',
                description: 'Siveing description',
                categoryId: 'any',
                price: 2000,
            }

            const resultResponse = {
                message: 'Product updated',
                success: true,
                data
            }

            mockProductModel.findByIdAndUpdate.mockResolvedValueOnce(data);

            const result = await productController.update(productId, data);
            expect(result).toEqual(resultResponse);
        });
    });

    describe('delete', () => {
        it('should return an message of category deleted', async () => {

            const productId = 'existingproductId';

            const resultResponse = {
                message: 'Product deleted successfully',
                success: true,
                data: productId
            }

            mockProductModel.findByIdAndDelete.mockResolvedValueOnce(productId);

            const result = await productController.delete(productId);
            expect(result).toEqual(resultResponse);
        });
    });

    describe('increase Stock product', () => {
        it('should return object increase stock of product', async () => {

            const productId = 'existingproductId';

            const data: UpdateProductStockDto = {
                stock: 10
            }

            const resultResponse = {
                message: 'Product stock increased successfully',
                success: true,
                data: data
            }

            mockProductModel.findByIdAndUpdate.mockResolvedValueOnce(data);

            const result = await productController.increaseStock(productId, data);
            expect(result).toEqual(resultResponse);
        });
    });

    describe('decrease Stock product', () => {
        it('should return object decrease stock of product', async () => {

            const productId = 'existingproductId';

            const data: UpdateProductStockDto = {
                stock: 10
            }

            const resultResponse = {
                message: 'Product stock decreased successfully',
                success: true,
                data: data
            }

            mockProductModel.findByIdAndUpdate.mockResolvedValueOnce(data);

            const result = await productController.decreaseStock(productId, data);
            expect(result).toEqual(resultResponse);
        });
    });

})

