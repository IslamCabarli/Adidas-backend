import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import CategoryDto from './dto/create.dto';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { RoleEnum } from 'src/shared/enums/role.enum';
import UpdateDto from './dto/update.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ) { }

    @Get()
    @ApiOperation({ summary: "Get all categories with children" })
    async getCategories() {
        let categories = await this.categoryService.nestedList()
        return categories
    }


    @Post()
    @Auth(RoleEnum.ADMIN)
    @ApiOperation({ summary: "Create category or subcategory (Only accessible by admin)" })
    async createCategory(@Body() body: CategoryDto) {
        let category = await this.categoryService.create(body)

        return category
    }


    @Post(':id')
    @Auth(RoleEnum.ADMIN)
    @ApiOperation({ summary: "Update categories or subcategories (Only accessible by admin)" })
    async update(@Body() body: UpdateDto, @Param("id") id: number) {
        let category = await this.categoryService.update(body, id)
        return category
    }

    @Delete(':id')
    @Auth(RoleEnum.ADMIN)
    @ApiOperation({ summary: "Delete categories by id (Only accessible by admin)" })
    async deleteCategory(@Param('id') id: number) {
        let category = await this.categoryService.deleteCategory(id)

        return category
    }

}