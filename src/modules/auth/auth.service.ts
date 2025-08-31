import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SignUpDto from './dto/signup.dto';
import SignInDto from './dto/signin.dto';
import { compare, hash } from 'bcrypt';
import { AuthUtils } from './authUtils';
import { UserEntity } from 'src/entities/User.entity';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ClsService } from 'nestjs-cls';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private authUtils: AuthUtils,
        private cls: ClsService
    ) { }

    async signUp(params: SignUpDto) {

        let checkUser = await this.userRepo.findOne({ where: { email: params.email } })

        if (checkUser) throw new ConflictException('User is already exsist with given email!')

        params.password = await hash(params.password, 10)

        let user = this.userRepo.create({
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email,
            password: params.password,
            gender: params.gender,
            dateofbirth: params.dateOfBirth
        })
        await user.save()
        return user
    }

    async signIn(params: SignInDto) {

        let user = await this.userRepo.findOne({ where: { email: params.email } })

        if (!user) throw new NotFoundException('Email or password is wrong!')

        let checkPassword = await compare(params.password, user.password)

        if (!checkPassword) throw new NotFoundException('Email or password is wrong!')

        let token = this.authUtils.generateToken(user.id)

        return {
            user: {
                ...user,
                password: undefined
            },

            token
        }

    }

    async resetPassword(param: ResetPasswordDto) {
        const user = this.cls.get('user');

        const checkUser = await this.userRepo.findOne({
            where: { id: user.id },
            select: ['id', 'password'],
        });

        if (!checkUser || !checkUser.password) throw new UnauthorizedException('User not found or password not available')

        if (param.newPassword === param.previousPassword) throw new BadRequestException('New password must be different from the previous password')

        const isPasswordValid = await bcrypt.compare(param.previousPassword, checkUser.password);

        if (!isPasswordValid) throw new UnauthorizedException('Previous password is incorrect')

        const hashedNewPassword = await bcrypt.hash(param.newPassword, 10);

        await this.userRepo.update(user.id, { password: hashedNewPassword });

        return { message: "Password updated successfully" }
    }


}