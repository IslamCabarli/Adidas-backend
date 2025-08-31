import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export default class SignInDto {
    @Type()
    @IsEmail()
    @ApiProperty({default: 'johndoe@example.com'})
    email: string


    @Type()
    @IsString()
    @ApiProperty()
    password: string
}