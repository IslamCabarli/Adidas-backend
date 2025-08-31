import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "../enums/role.enum";

export const Role = (...roles: RoleEnum[]) => {
    return SetMetadata('roles', roles)
}