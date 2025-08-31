import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUtils } from './authUtils';
import { UserEntity } from 'src/entities/User.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [AuthController],
    providers: [AuthService, AuthUtils],
})
export class AuthModule { }