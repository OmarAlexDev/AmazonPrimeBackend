import { IsString, IsOptional, IsEmail, IsBoolean } from "class-validator";

export class AdminUpdateUserDto{

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

    @IsOptional()
    @IsBoolean()
    isAdmin: boolean;
}