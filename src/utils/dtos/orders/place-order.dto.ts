import { IsInstance, IsNumber, IsString } from "class-validator";
import { Movie, Wishlist } from "src/entities";

export class PlaceOrderDto{
    @IsInstance(Movie)
    products: Movie[]

    @IsNumber()
    cart: Number;
}