import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class AddMovieToHistoryDTO{
    @IsNumber()
    movieId: number;

    @IsOptional()
    @IsNumber()
    @Max(100)
    @Min(0)
    watch_time: number;
}