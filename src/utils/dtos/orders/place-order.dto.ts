import { IsInstance, IsNumber, IsString } from "class-validator";
import { Product, Cart } from "src/entities";

export class PlaceOrderDto{
    @IsInstance(Product)
    products: Product[]

    @IsNumber()
    cart: Number;
}