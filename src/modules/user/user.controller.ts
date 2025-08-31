import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { RoleEnum } from 'src/shared/enums/role.enum';

@Controller('user')
export class UserController {
    constructor() { }



    @Auth(RoleEnum.USER, RoleEnum.ADMIN)
    @Get()
    getUsers() {
        return true
    }

}