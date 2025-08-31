import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, IsEnum, IsUUID } from 'class-validator';
import { ColorEnum, SizeEnum } from 'src/shared/enums/products.enum';

export class ProductCreateDto {
    @Type()
    @IsString()
    @ApiProperty()
    name: string;

    @Type()
    @IsString()
    @ApiProperty()
    description: string;

    @Type()
    @IsNumber()
    @ApiProperty()
    price: number;

    @Type()
    @IsNumber()
    @ApiProperty()
    stock: number;

    @Type()
    @IsNumber()
    @ApiProperty()
    brandId: number

    @Type()
    @IsArray()
    @ApiProperty({ isArray: true, enum: ColorEnum, example: [ColorEnum.BEIGE, ColorEnum.LAVENDER] })
    @IsEnum(ColorEnum, { each: true })
    colors: ColorEnum[];

    @Type()
    @IsArray()
    @ApiProperty({ isArray: true, enum: SizeEnum, example: [SizeEnum.EU36, SizeEnum.XL] })
    @IsEnum(SizeEnum, { each: true, })
    sizes: SizeEnum[];

    @Type()
    @IsArray()
    @ApiProperty({ isArray: true, example: [1] })
    images: number[];

    @Type()
    @IsNumber()
    @ApiProperty()
    categoryId: number;

    @Type()
    @IsString()
    @IsOptional()
    @ApiProperty()
    slug?: string


}
