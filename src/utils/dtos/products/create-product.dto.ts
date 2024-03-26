import { IsNumber, IsOptional, IsString } from "class-validator";
export class CreateProductDto{

    @IsString()
    name: string;

    @IsNumber()
    @IsOptional()
    quantity_on_inventory: number;

    @IsOptional()
    category: string;

    @IsNumber()
    price: number;

    @IsOptional()
    brand: string;

    @IsOptional()
    @IsString()
    description: string;
}