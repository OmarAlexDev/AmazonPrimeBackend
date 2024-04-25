import { IsString, IsOptional, IsEmail, IsBoolean } from "class-validator";

export class AdminCreateUserDto{

    @IsString()
    @IsOptional()
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsBoolean()
    @IsOptional()
    isAdmin: boolean;
}