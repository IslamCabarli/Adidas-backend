import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator'
import { GenderEnum } from "src/shared/enums/gender.enum"

export default class SignUpDto {
    @Type()
    @IsString()
    @ApiProperty({ default: 'John' })
    firstName: string

    @Type()
    @IsString()
    @ApiProperty({ default: 'Doe' })
    lastName: string

    @Type()
    @IsString()
    @ApiProperty()
    password: string

    @Type()
    @IsEmail()
    @ApiProperty({ default: 'johndoe@example.com' })
    email: string

    @Type()
    @IsDate()
    @ApiProperty()
    dateOfBirth: Date

    @Type()
    @IsEnum(GenderEnum)
    @ApiProperty({ default: GenderEnum.MALE })
    gender: GenderEnum


}