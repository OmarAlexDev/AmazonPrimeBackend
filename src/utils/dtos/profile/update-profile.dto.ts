import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
export class UpdateProfileDto{
    @IsString()
    @IsOptional()
    username: string;

    @IsBoolean()
    @IsOptional()
    forKids: boolean

    @IsNumber()
    @Max(9999)
    @Min(0o1)
    @IsOptional()
    pin: number;
}   
