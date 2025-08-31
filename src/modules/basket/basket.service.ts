import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';
import { BasketEntity, BasketItemEntity } from 'src/entities/Basket.entity';
import { ProductEntity } from 'src/entities/Products.entity';
import { Repository } from 'typeorm';
import BasketDto from './dto/add.dto';
import { ColorEnum, SizeEnum } from 'src/shared/enums/products.enum';

@Injectable()
export class BasketService {
    constructor(
        @InjectRepository(BasketEntity)
        private basketRepo: Repository<BasketEntity>,
        @InjectRepository(BasketItemEntity)
        private basketItemRepo: Repository<BasketItemEntity>,
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>,
        private cls: ClsService
    ) { }

    async getBasket() {
        let user = this.cls.get("user")

        let basket = await this.basketRepo.find({
            where: { userId: user.id },
            select: {
                id: true,
                totalItems: true,
                totalPrice: true,
                items: {
                    id: true,
                    size: true,
                    color: true,
                    quantity: true,
                    price: true,
                    product: true
                }
            },
            relations: ['items', 'items.product', 'items.product.images']
        })

        basket[0].items.forEach(item => {
            const { color, size, product } = item;

            product.colors = product.colors.filter(c => c === color);

            product.sizes = product.sizes.filter(s => s === size);
        });

        if (!basket) throw new NotFoundException("Basket is empty or basket is not found!")

        return basket
    }

    async addBasket(id: number, params: BasketDto) {
        let user = await this.cls.get("user")
        let product = await this.productRepo.findOne({ where: { id } })

        if (!product) throw new NotFoundException('Product is not found with given id!')

        let basket = await this.basketRepo.findOne({
            where: {
                userId: user.id,
            }
        })


        if (!basket) {
            basket = this.basketRepo.create({
                userId: user.id
            })

            await basket.save()

        }

        let exsistingItem = await this.basketItemRepo.findOne({
            where: {
                productId: id,
                basketId: basket?.id,
                color: params.color,
                size: params.size
            }
        })

        if (exsistingItem) {
            const newQuantity = exsistingItem.quantity + params.quantity;

            if (newQuantity <= 0) {
                basket.totalPrice -= exsistingItem.price;
                basket.totalItems -= exsistingItem.quantity;

                await Promise.all([
                    this.removeFromBasket(product.id),
                    basket.save()
                ]);
            } else {
                exsistingItem.quantity = newQuantity;
                exsistingItem.price = +product.price * newQuantity;

                basket.totalPrice += +product.price * params.quantity;
                basket.totalItems += params.quantity;

                await Promise.all([
                    basket.save(),
                    exsistingItem.save()
                ]);
            }

            return exsistingItem;
        }

        else {
            let basketItem

            let exsistingColor = product?.colors.includes(params.color as ColorEnum)

            if (!exsistingColor) throw new NotFoundException("Color is not found in product!")

            let exsistingSize = product?.sizes.includes(params.size as SizeEnum)

            if (!exsistingSize) throw new NotFoundException("Size is not found in product!")

            if (params.quantity > 0) {
                basketItem = this.basketItemRepo.create({
                    basketId: basket?.id,
                    size: params.size,
                    price: product.price,
                    color: params.color,
                    quantity: params.quantity,
                    productId: id
                })
                basket.totalItems += +params.quantity
                basket.totalPrice += +product.price
                basket.save()


            }
            await basketItem.save()
            return basketItem
        }

    }

    async removeFromBasket(id: number) {
        let user = this.cls.get("user")

        // let product = await this.productRepo.findOne({ where: { id } })

        // if (!product) throw new NotFoundException("Product is not found with given id!")

        let basket = await this.basketRepo.findOne({ where: { userId: user.id } })

        if (!basket) throw new NotFoundException("User has not yet basket!")

        let basketItem = await this.basketItemRepo.findOne({
            where: {
                basketId: basket.id,
                id
            }
        })

        if (!basketItem) throw new NotFoundException("Basket item is not found!")

        basket.totalItems -= basketItem?.quantity
        basket.totalPrice -= +basketItem?.price


        await this.basketItemRepo.delete({ id })

        await basket.save()
        return { message: "Product successfully deleted from basket!" }
    }
}