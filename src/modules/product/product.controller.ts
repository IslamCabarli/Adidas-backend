import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto/create.dto';
import { ProductUpdateDto } from './dto/update.dto';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationQueryDto } from './dto/paginate.dto';
import { FilterProductsDto } from './dto/filter.dto';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }

    @Get()
    async getPaginatedProducts(@Query() pagination: PaginationQueryDto) {
        return await this.productService.getPaginatedProducts(pagination)
    }

    @Get('/all')
    async getAllProducts() {
        return await this.productService.getAllProducts()
    }

    @Get('/filter')
    async filterProducts(@Query() query: FilterProductsDto) {
        return await this.productService.filterProducts(query)
    }


    @Post()
    @Auth(RoleEnum.ADMIN)
    @ApiOperation({ summary: "Create product (Only accessible by admin)" })
    async create(@Body() body: ProductCreateDto) {
        let product = await this.productService.create(body)

        return product
    }

    @Post(":id")
    @Auth(RoleEnum.ADMIN)
    @ApiOperation({ summary: "Update product (Only accessible by admin)" })
    async update(@Param("id") id: number, @Body() body: ProductUpdateDto) {
        return await this.productService.update(body, id)
    }

    @Get("/category/:id")
    @ApiOperation({ summary: "Get products by id" })
    async getProductByCategoryId(@Param("id") id: number) {
        return await this.productService.getProductByCategoryId(id)
    }

    @Get(":id")
    @ApiOperation({ summary: "Get product by id" })
    async getProductById(@Param("id") id: number) {
        return await this.productService.getProductById(id)
    }



    @Delete(":id")
    @ApiOperation({ summary: "Delete category (Only accessible by admin)" })
    @Auth(RoleEnum.ADMIN)
    async deleteProduct(@Param("id") id: number) {
        return await this.productService.deleteProduct(id)
    }

}