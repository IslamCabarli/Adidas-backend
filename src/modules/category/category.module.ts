import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryEntity from 'src/entities/Category.entity';
import { CategoryService } from './category.service';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    controllers: [CategoryController],
    providers: [CategoryService],
    
})
export class CategoryModule { };