import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { RoleEnum } from 'src/shared/enums/role.enum';
import BrandCreateDto from './dto/create.dto';
import UpdateBrandDto from './dto/update.dto';

@Controller('brand')
export class BrandController {
    constructor(
        private brandService: BrandService
    ) { }


    @Get()
    async getAllBrands() {
        return await this.brandService.getAllBrands()
    }

    @Post()
    @Auth(RoleEnum.ADMIN)
    @ApiOperation({ summary: "Create brand (Only accessible by admin)" })
    async createCategory(@Body() body: BrandCreateDto) {
        let category = await this.brandService.create(body)

        return category
    }


    @Post(':id')
    @Auth(RoleEnum.ADMIN)
    @ApiOperation({ summary: "Update brands (Only accessible by admin)" })
    async update(@Body() body: UpdateBrandDto, @Param("id") id: number) {
        let brand = await this.brandService.update(body, id)
        return brand
    }

    @Delete(':id')
    @Auth(RoleEnum.ADMIN)
    @ApiOperation({ summary: "Delete brands by id (Only accessible by admin)" })
    async deleteCategory(@Param('id') id: number) {
        let brand = await this.brandService.deleteBrand(id)

        return brand
    }
}