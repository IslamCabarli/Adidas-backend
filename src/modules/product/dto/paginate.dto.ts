import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsInt, IsNumber } from 'class-validator';

export class PaginationQueryDto {
    @ApiPropertyOptional({ example: 1, description: 'Page number (default: 1)' })
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    page?: number = 1;

    @ApiPropertyOptional({ example: 10, description: 'Items per page (default: 10)' })
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit?: number = 10;
}
