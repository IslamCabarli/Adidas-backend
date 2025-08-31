import { PartialType } from '@nestjs/swagger';
import { ProductCreateDto } from './create.dto';

export class ProductUpdateDto extends PartialType(ProductCreateDto) { }
