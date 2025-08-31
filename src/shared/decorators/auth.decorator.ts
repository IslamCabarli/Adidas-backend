import { applyDecorators, UseGuards } from "@nestjs/common"
import { ApiBearerAuth } from "@nestjs/swagger"
import AuthGuard from "src/guards/auth.guard"
import { Role } from "./role.decorator"
import { RoleEnum } from "../enums/role.enum"
import { RoleGuard } from "src/guards/role.guard"

export const Auth = (...roles: RoleEnum[]) => {
    return applyDecorators(
        UseGuards(AuthGuard, RoleGuard),
        Role(...roles),
        ApiBearerAuth()
    )
}