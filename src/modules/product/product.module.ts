import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/Products.entity';
import CategoryEntity from 'src/entities/Category.entity';
import UploadEntity from 'src/entities/Upload.entity';
import BrandEntity from 'src/entities/Brand.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity, UploadEntity, BrandEntity])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule { };