// TESTING CATEGORY

import { Test, TestingModule } from "@nestjs/testing";
import { CategoryService } from "../service/category.service";
import { CategoryController } from "./category.controller";
import { Category } from "../schema/category.schema";
import { getModelToken } from "@nestjs/mongoose";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import { Product } from "../../product/schema/product.schema";


// Mock CategoryModel
const mockCategoryModel = {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
};

const mockProductModel = {
    findOne: jest.fn()
};

describe('Category Controller', () => {

    let categoryController: CategoryController;
    let categoryService: CategoryService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [
                CategoryService,
                // Provide the mock for CategoryModel
                { provide: getModelToken(Category.name), useValue: mockCategoryModel },
                { provide: getModelToken(Product.name), useValue: mockProductModel },
            ],
        }).compile();

        categoryService = app.get<CategoryService>(CategoryService)
        categoryController = app.get<CategoryController>(CategoryController);
    });

    it('categoryController, categoryService should be defined', () => {
        expect(categoryService).toBeDefined();
        expect(categoryController).toBeDefined();
    });


    describe('findAll', () => {
        it('should return an array of categories"', () => {
            const result = {
                message: "All categories",
                data: [
                    {
                        "_id": "6604f578abb496ac89554e33",
                        "name": "Drink",
                        "description": "hello this description for drink",
                    },
                ]
            };

            // MOCK METHOD
            jest.spyOn(categoryService, 'findAll').mockImplementation(() => result as any);

            expect(categoryController.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('should return an object of category created"', async () => {

            const data: CreateCategoryDto = {
                name: 'Siveing',
                description: 'Siveing description',
            }

            const resultResponse = {
                message: 'Category created',
                success: true,
                data: { name: 'Siveing', description: 'Siveing description' }
            }

            mockCategoryModel.create.mockResolvedValueOnce(data);

            const result = await categoryController.create(data);
            expect(result).toEqual(resultResponse);
        });
    });

    describe('update', () => {

        it('should return an error message if category not found', async () => {

            const categoryId = 'existingCategoryId';
            const updatedCategoryData: UpdateCategoryDto = {
                name: 'Siveing Updated',
                description: 'Siveing description updated'
            };

            const resultResponse = {
                message: 'Category not found',
                success: false,
                data: null
            }

            mockCategoryModel.findByIdAndUpdate.mockResolvedValueOnce(null);

            const result = await categoryController.update(categoryId, updatedCategoryData);
            expect(result).toEqual(resultResponse);
        });

        it('should return an object of category update', async () => {

            const categoryId = 'existingCategoryId';
            const updatedCategoryData: UpdateCategoryDto = {
                name: 'Siveing Updated',
                description: 'Siveing description updated'
            };

            const resultResponse = {
                message: 'Category updated',
                success: true,
                data: {
                    ...updatedCategoryData
                }
            }

            mockCategoryModel.findByIdAndUpdate.mockResolvedValueOnce(updatedCategoryData);

            const result = await categoryController.update(categoryId, updatedCategoryData);
            expect(result).toEqual(resultResponse);
        });
    });

    describe('delete', () => {

        it('should return an message cannot delete if category has used by any product', async () => {

            mockProductModel.findOne = jest.fn().mockResolvedValueOnce(true);

            const categoryId = 'existingCategoryId';

            const resultResponse = {
                message: 'Category is used by some product, cannot delete',
                success: false,
                data: null
            }

            mockCategoryModel.findByIdAndDelete.mockResolvedValueOnce(categoryId);

            const result = await categoryController.delete(categoryId);
            expect(result).toEqual(resultResponse);
        });

        it('should return an message of category deleted', async () => {

            mockProductModel.findOne = jest.fn().mockResolvedValueOnce(false);
            
            const categoryId = 'existingCategoryId';

            const resultResponse = {
                message: 'Category deleted successfully',
                success: true,
                data: categoryId
            }

            mockCategoryModel.findByIdAndDelete.mockResolvedValueOnce(categoryId);

            const result = await categoryController.delete(categoryId);
            expect(result).toEqual(resultResponse);
        });
    });
});