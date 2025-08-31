import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsArray, IsNumber, IsEnum } from 'class-validator';
import { ColorEnum, SizeEnum } from 'src/shared/enums/products.enum';

export class FilterProductsDto {
    @ApiPropertyOptional({ type: Number, description: 'Category ID' })
    @IsOptional()
    @Type(() => Number)
    brandId?: number;

    @ApiPropertyOptional({
        type: [String],
        enum: ColorEnum,
        description: 'Filter by colors',
        example: ['red', 'blue'] // Swagger üçün nümunə
    })
    @Transform(({ value }) => {
        if (!value) return undefined;

        // Əgər artıq array-dirsə, onu qaytarırıq
        if (Array.isArray(value)) {
            return value;
        }

        // Əgər string-dirsə, split edirik
        if (typeof value === 'string') {
            return value.split(',').map(item => item.trim());
        }

        // Digər halda undefined qaytarırıq
        return undefined;
    })
    @IsOptional()
    @IsArray()
    @IsEnum(ColorEnum, { each: true })
    colors?: ColorEnum[];

    @ApiPropertyOptional({
        type: [String],
        enum: SizeEnum,
        description: 'Filter by sizes',
        example: ['S', 'M', 'L'] // Swagger üçün nümunə
    })
    @Transform(({ value }) => {
        console.log('sizes transform - value:', value, 'type:', typeof value);

        if (!value) return undefined;

        // Əgər artıq array-dirsə, onu qaytarırıq
        if (Array.isArray(value)) {
            console.log('sizes is already array:', value);
            return value;
        }

        // Əgər string-dirsə, split edirik
        if (typeof value === 'string') {
            const result = value.split(',').map(item => item.trim());
            console.log('sizes transformed from string:', result);
            return result;
        }

        // Digər halda undefined qaytarırıq
        console.log('sizes returning undefined for:', value);
        return undefined;
    })
    @IsOptional()
    @IsArray()
    @IsEnum(SizeEnum, { each: true })
    sizes?: SizeEnum[];

    @ApiPropertyOptional({ type: Number, description: 'Minimum price' })
    @IsOptional()
    @Type(() => Number)
    minPrice?: number;

    @ApiPropertyOptional({ type: Number, description: 'Maximum price' })
    @IsOptional()
    @Type(() => Number)
    maxPrice?: number;
}