import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./Products.entity";

@Entity('uploads')

export default class UploadEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => ProductEntity, (product) => product.images, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'product'
    })
    product: ProductEntity;
}