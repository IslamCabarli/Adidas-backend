import { ColorEnum, SizeEnum } from 'src/shared/enums/products.enum';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity,
    OneToMany
} from 'typeorm';
import CategoryEntity from './Category.entity';
import UploadEntity from './Upload.entity';
import BrandEntity from './Brand.entity';
import { BasketItemEntity } from './Basket.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ default: 0 })
    stock: number;

    @Column({ unique: true })
    slug: string;

    @Column({ type: 'enum', enum: ColorEnum, array: true })
    colors: ColorEnum[];

    @Column({ type: 'enum', enum: SizeEnum, array: true })
    sizes: SizeEnum[];

    @OneToMany(() => UploadEntity, (image) => image.product, {
        cascade: true,
    })
    images: UploadEntity[];

    @Column()
    categoryId: number;

    @Column()
    brandId: number;

    @OneToMany(() => BasketItemEntity, (item) => item.product)
    basketItems: BasketItemEntity[];

    @ManyToOne(() => CategoryEntity, (category) => category.products, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'categoryId',
        referencedColumnName: 'id'
    })
    category: CategoryEntity;

    @ManyToOne(() => BrandEntity, (brand) => brand.products, {
        onDelete: "CASCADE",
        nullable: false
    })
    @JoinColumn({
        name: 'brandId',
        referencedColumnName: 'id'
    })
    brand: BrandEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}