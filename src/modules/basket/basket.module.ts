import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketEntity, BasketItemEntity } from 'src/entities/Basket.entity';
import { ProductEntity } from 'src/entities/Products.entity';
import { UserEntity } from 'src/entities/User.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BasketEntity, ProductEntity, UserEntity, BasketItemEntity])],
    controllers: [BasketController],
    providers: [BasketService],
})
export class BasketModule { };