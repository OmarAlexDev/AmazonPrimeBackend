import { IsString, IsOptional, IsEmail, IsNumber, IsBoolean } from "class-validator";
import { Wishlist } from "src/entities";

export class CreateUserDto{

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsOptional()
    @IsBoolean()
    isAdmin: boolean;
}