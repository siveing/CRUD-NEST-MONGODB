
//  CATEGORY DTO - DATA TRANSFER OBJECT

import { PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsNotEmpty, IsOptional } from "class-validator";

/**
 * DTO create categoria
 */
export class CreateCategoryDto {

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
}

export class UpdateCategoryDto extends PickType(CreateCategoryDto, ['name', 'description'] as const) {
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description: string;
}