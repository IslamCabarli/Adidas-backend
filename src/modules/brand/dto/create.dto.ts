import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export default class BrandCreateDto {
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
}