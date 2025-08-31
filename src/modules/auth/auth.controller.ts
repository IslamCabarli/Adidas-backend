import { Body, Controller, Post } from '@nestjs/common';
import SignUpDto from './dto/signup.dto';
import { AuthService } from './auth.service';
import SignInDto from './dto/signin.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { RoleEnum } from 'src/shared/enums/role.enum';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    async signUp(@Body() body: SignUpDto) {
        let user = await this.authService.signUp(body)
        return user
    }

    @Post('/signin')
    async signIn(@Body() body: SignInDto) {
        let user = await this.authService.signIn(body)
        return user
    }

    @Auth()
    @Post('reset-password')
    async resetPassword(@Body() body: ResetPasswordDto) {
        return await this.authService.resetPassword(body)
    }
}