import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryEntity from 'src/entities/Category.entity';
import { Repository } from 'typeorm';
import CategoryDto from './dto/create.dto';
import UpdateDto from './dto/update.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepo: Repository<CategoryEntity>
    ) { }


    async create(params: CategoryDto) {
        const checkedCategory = await this.categoryRepo.findOne({
            where: { slug: params.slug }
        });

        if (checkedCategory) throw new ConflictException('Category has already exist with given slug!')

        if (params.parentId) {
            const parentCategory = await this.categoryRepo.findOne({
                where: { id: params.parentId }
            })

            if (!parentCategory) throw new NotFoundException('Parent category is not found with given id!')
        }

        const category = this.categoryRepo.create(params);

        await category.save()

        return category;
    }

    nestedList = async () => {
        let list = await this.categoryRepo.find()

        let result = list
            .filter((item) => !item.parentId)
            .map((item) => this.subCategories(list, item));

        return result;
    }

    subCategories = (list: any, category: any) => {
        const children = list
            .filter((item: any) => item.parentId == category.id)
            .map((item: any) => this.subCategories(list, item));
        return {
            ...category,
            children: children.length ? children : undefined,
        };
    };

    async update(params: UpdateDto, id: number) {
        const category = await this.categoryRepo.findOne({
            where: { id }
        });

        if (!category) throw new NotFoundException('Category is not found with given id!')

        if (params.slug && params.slug !== category.slug) {
            const checkedCategory = await this.categoryRepo.findOne({
                where: { slug: params.slug }
            })

            if (checkedCategory) throw new ConflictException('Category with given slug already exists!')
        }

        if (params.parentId !== null) {
            const parentCategory = await this.categoryRepo.findOne({
                where: { id: params.parentId }
            })

            if (!parentCategory) throw new NotFoundException('Parent category is not found with given id!')

            if (params.parentId === category.id) throw new ConflictException('Category cannot be its own parent!')
        }

        Object.assign(category, {
            ...params,
            name: params.name ?? category.name,
            slug: params.slug ?? category.slug,
            parentId: params.parentId !== undefined ? params.parentId : category.parentId
        });

        const updatedCategory = await this.categoryRepo.save(category);

        return updatedCategory;
    }

    async deleteCategory(id: number) {
        const category = await this.categoryRepo.findOne({
            where: { id },
            relations: ['children']
        });

        if (!category) throw new NotFoundException("Category is not found with given id!")

        await this.categoryRepo.remove(category);

        return {
            message: "Category deleted successfully!",
            deletedCategory: category
        };
    }
}