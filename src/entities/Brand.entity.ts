import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./Products.entity";

@Entity('brand')
export default class BrandEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    slug: string

    @OneToMany(() => ProductEntity, (product) => product.brand)
    products: ProductEntity[]
}