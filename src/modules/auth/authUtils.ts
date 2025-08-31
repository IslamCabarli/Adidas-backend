import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUtils {
    constructor(
        private jwtService: JwtService
    ) { }


    generateToken(userId) {
        return this.jwtService.sign({ userId })
    }
}