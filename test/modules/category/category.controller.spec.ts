// TESTING CATEGORY

import { CategoryController } from "@modules/category/controller/category.controller";
import { CategoryService } from "@modules/category/service/category.service";
import { Test, TestingModule } from "@nestjs/testing";

describe('Category Controller', () => {

    let categoryController: CategoryController;
    let categoryService: CategoryService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [CategoryService],
        }).compile();

        categoryController = app.get<CategoryController>(CategoryController);
    });

    describe('findAll', () => {
        it('should return "Welcome to CRUD by jin with NestJS"', () => {
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
});