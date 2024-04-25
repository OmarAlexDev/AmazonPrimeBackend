import { IsString, IsOptional, IsEmail } from "class-validator";

export class UpdateUserDto{

    @IsString()
    @IsOptional()
    phone: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

}