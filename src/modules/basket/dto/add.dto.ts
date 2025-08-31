import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { ColorEnum, SizeEnum } from "src/shared/enums/products.enum";

export default class BasketDto {

    @Type()
    @IsString()
    @IsOptional()
    @ApiProperty({ default: ColorEnum.BLACK })
    color?: string

    @Type()
    @IsString()
    @IsOptional()
    @ApiProperty({ default: SizeEnum.XL })
    size?: string

    @Type()
    @IsNumber()
    @ApiProperty({ default: 1 })
    quantity: number
}