import { IsNumber, IsOptional, IsString } from "class-validator";
export class CreateProductDto{

    @IsString()
    name: string;

    @IsNumber()
    quantity_on_inventory: number;

    @IsOptional()
    category: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    description: string;
}