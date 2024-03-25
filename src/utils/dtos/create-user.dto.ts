import { IsString, IsOptional, IsEmail } from "class-validator";
import { Cart } from "src/entities";

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
}