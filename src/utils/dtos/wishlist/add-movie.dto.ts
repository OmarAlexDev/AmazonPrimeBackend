import { IsNumber } from "class-validator";

export class AddMovieToWishlistDTO{
    @IsNumber()
    profileId: number;

    @IsNumber()
    movieId: number;
}