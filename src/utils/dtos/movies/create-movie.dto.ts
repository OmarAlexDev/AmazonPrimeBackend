import { IsNumber, IsOptional, IsString, Min, Max } from "class-validator";
import { Transform } from "class-transformer";
export class CreateMovieDto{

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    duration: string;

    @IsNumber()
    @Min(1980)
    @Max(2024)
    year: number;

    @IsString()
    @IsOptional()
    @Min(5)
    @Max(18)
    ageLimit: number;

    @IsOptional()
    @IsString({each: true})
    @Transform(({value})=>value.toString())
    categories: string;

    @IsOptional()
    @IsString()
    studio: string;

    @IsNumber()
    @IsOptional()
    @Min(5)
    @Max(10)
    imdb: number;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString({each: true})
    @Transform(({value})=>value.toString())
    subtitles: string;

    @IsOptional()
    @IsString({each: true})
    @Transform(({value})=>value.toString())
    languages: string;

    @IsOptional()
    @IsString({each: true})
    @Transform(({value})=>value.toString())
    directors: string;

    @IsOptional()
    @IsString({each: true})
    @Transform(({value})=>value.toString())
    producers: string;

    @IsOptional()
    @IsString({each: true})
    @Transform(({value})=>value.toString())
    starring: string;
}