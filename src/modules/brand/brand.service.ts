import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BrandEntity from 'src/entities/Brand.entity';
import { Repository } from 'typeorm';
import BrandDto from './dto/create.dto';
import UpdateBrandDto from './dto/update.dto';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(BrandEntity)
        private readonly brandRepo: Repository<BrandEntity>
    ) { }



    async getAllBrands() {
        let brands = await this.brandRepo.find()
        return brands
    }

    async create(params: BrandDto) {
        const checkedBrand = await this.brandRepo.findOne({
            where: { slug: params.slug }
        });

        if (checkedBrand) throw new ConflictException('Brand has already exist with given slug!')


        const brand = this.brandRepo.create(params);

        await brand.save()

        return brand;
    }

    async update(params: UpdateBrandDto, id: number) {
        const brand = await this.brandRepo.findOne({
            where: { id }
        });

        if (!brand) throw new NotFoundException('Brand is not found with given id!')

        if (params.slug && params.slug !== brand.slug) {
            const checkedBrand = await this.brandRepo.findOne({
                where: { slug: params.slug }
            })

            if (checkedBrand) throw new ConflictException('Brand with given slug already exists!')
        }

        Object.assign(brand, {
            ...params,
            name: params.name ?? brand.name,
            slug: params.slug ?? brand.slug,
        });

        const updatedBrand = await this.brandRepo.save(brand);

        return updatedBrand;
    }

    async deleteBrand(id: number) {
        const Brand = await this.brandRepo.findOne({ where: { id } })

        if (!Brand) throw new NotFoundException("Brand is not found with given id!")

        await this.brandRepo.remove(Brand);

        return {
            message: "Brand deleted successfully!",
            deletedBrand: Brand
        };
    }
}