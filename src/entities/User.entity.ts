import { GenderEnum } from "src/shared/enums/gender.enum";
import { RoleEnum } from "src/shared/enums/role.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasketEntity } from "./Basket.entity";

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string

    @Column({ default: GenderEnum.MALE })
    gender: GenderEnum

    @Column({ default: RoleEnum.USER })
    role: RoleEnum

    @Column({ unique: true })
    email: string

    @Column()
    dateofbirth: Date

    @OneToOne(() => BasketEntity, (basket) => basket.user, { cascade: true })
    basket: BasketEntity;

    @CreateDateColumn()
    createAt: Date


}