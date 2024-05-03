import { Movie } from "src/utils/entities";
import {IsOptional, Max, Min, IsNumber} from 'class-validator'

export class CreateRecordDTO{
    @IsOptional()
    movie: Movie

    @IsOptional()
    @IsNumber()
    @Max(100)
    @Min(0)
    watch_time: number;
}