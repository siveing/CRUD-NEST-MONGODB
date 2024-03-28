
//  Product DTO - DATA TRANSFER OBJECT

import { PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

/**
 * DTO create categoria
 */
export class CreateProductDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @MaxLength(200)
    @IsOptional()
    @ApiProperty({ required: false })
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    stock: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    categoryId: string;
}

export class UpdateProductDto extends PickType(CreateProductDto, ['name', 'description', 'categoryId', 'price'] as const) {
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    categoryId: string;
}

export class UpdateProductStockDto extends PickType(CreateProductDto, ['stock'] as const) { 
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    stock: number;
}