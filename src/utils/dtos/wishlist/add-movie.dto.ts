import { IsNumber } from "class-validator";

export class AddMovieToWishlistDTO{
    @IsNumber()
    movieId: number;
}