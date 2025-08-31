import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    @MinLength(6, { message: 'Previous password must be at least 6 characters long' })
    @ApiProperty()
    previousPassword: string;

    @IsString()
    @MinLength(6, { message: 'New password must be at least 6 characters long' })
    @ApiProperty()
    newPassword: string;
}