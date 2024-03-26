import { IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class FilterMovie{

    @IsOptional()
    @Transform(({value})=>value.replace('_',' '))
    title: string;

    @IsOptional()
    @Transform(({value})=>value.replace('_',','))
    categories: string;

    @IsOptional()
    @Transform(({value})=>Number(value))
    year: number;

    @IsOptional()
    @Transform(({value})=>Number(value))
    ageLimit: number;

    @IsOptional()
    @Transform(({value})=>Number(value))
    imdb: number;

    @IsOptional()
    @Transform(({value})=>value.replace('_',' '))
    studio: string;
}