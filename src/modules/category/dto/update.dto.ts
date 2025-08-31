import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export default class UpdateDto {
    @Type()
    @IsString()
    @MinLength(3)
    @IsOptional()
    @ApiProperty()
    name: string

    @Type()
    @IsString()
    @MinLength(3)
    @IsOptional()
    @ApiProperty()
    slug: string

    @Type()
    @IsNumber()
    @IsOptional()
    @ApiProperty({ default: 1 })
    parentId: number
}