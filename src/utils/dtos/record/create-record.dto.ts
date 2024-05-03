import { Movie } from "src/utils/entities";
import {IsOptional} from 'class-validator'

export class CreateRecordDTO{
    @IsOptional()
    movie: Movie

    @IsOptional()
    watch_time: number;
}