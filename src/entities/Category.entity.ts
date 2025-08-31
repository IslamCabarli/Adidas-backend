import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./Products.entity";

@Entity('category')
export default class CategoryEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    slug: string

    @Column({ nullable: true })
    parentId: number

    @ManyToOne(() => CategoryEntity, (category) => category.children, {
        nullable: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'parentId' })
    parent: CategoryEntity

    @OneToMany(() => CategoryEntity, (category) => category.parent)
    children: CategoryEntity[]

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]

    @CreateDateColumn()
    createdAt: Date
}