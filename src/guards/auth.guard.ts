import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClsService } from "nestjs-cls";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export default class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private clsService: ClsService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        let request = context.switchToHttp().getRequest()

        let authorization = request.headers.authorization || ''

        let token = authorization.split(' ')[1]
        try {
            let payload = this.jwtService.verify(token)

            if (!payload.userId) throw new UnauthorizedException()

            let user = await this.userService.getUserById(payload.userId)

            if (!user) throw new UnauthorizedException()

            this.clsService.set('user', user)

            return true
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}