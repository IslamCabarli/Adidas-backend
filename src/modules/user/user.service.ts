import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) { }


    async getUserById(id: number) {
        let user = await this.userRepo.findOne({ where: { id } })

        if (!user) throw new NotFoundException('User is not fpound with given id!')

        return user
    }
}