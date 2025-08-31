import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export default class CategoryDto {
    @Type()
    @IsString()
    @MinLength(3)
    @ApiProperty()
    name: string

    @Type()
    @IsString()
    @MinLength(3)
    @ApiProperty()
    slug: string

    @Type()
    @IsNumber()
    @IsOptional()
    @ApiProperty({ default: 1 })
    parentId: number
}