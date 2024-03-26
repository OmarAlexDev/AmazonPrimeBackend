import { IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class FilterProduct{

    @IsOptional()
    @Transform(({value})=>value.replace('_',' '))
    name: string;

    @IsOptional()
    @Transform(({value})=>value.replace('_',' '))
    category: string;

    @IsOptional()
    @Transform(({value})=>value.replace('_',' '))
    brand: string;

    @IsOptional()
    @Transform(({value})=>Number(value))
    price: number;

    @IsOptional()
    @Transform(({value})=>Number(value))
    quantity_on_inventory: number;
}