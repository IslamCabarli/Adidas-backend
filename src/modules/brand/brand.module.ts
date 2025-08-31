import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import BrandEntity from 'src/entities/Brand.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BrandEntity])],
    controllers: [BrandController],
    providers: [BrandService],
})
export class BrandModule { };