import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BasketService } from './basket.service';
import { Auth } from 'src/shared/decorators/auth.decorator';
import BasketDto from './dto/add.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('basket')
export class BasketController {
    constructor(
        private basketService: BasketService
    ) { }


    @Get()
    @Auth()
    @ApiOperation({ summary: "Get Basket" })
    async getBasket() {
        let basket = await this.basketService.getBasket()
        return basket
    }

    @Post(':id')
    @Auth()
    @ApiOperation({
        summary: 'Add or update product quantity in basket',
        description: `
    This endpoint adds a product to the basket or updates its quantity.
    - If \quantity\ is *positive*, it will increment the quantity.
    - If \quantity\ is *negative*, it will decrement the quantity.
    - If the quantity becomes 0, the product will be removed from the basket.
  `
    })
    async addToBasket(@Body() params: BasketDto, @Param("id") id: number) {
        let basket = await this.basketService.addBasket(id, params)
        return basket
    }

    @Delete(":id")
    @Auth()
    @ApiOperation({ summary: "Delete item from basket by productId" })
    async deleteItem(@Param("id") id: number) {
        return await this.basketService.removeFromBasket(id)
    }
}