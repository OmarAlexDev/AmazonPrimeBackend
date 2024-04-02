import {Expose} from 'class-transformer'
import { Wishlist } from 'src/entities';

export class ResponseUserDto{

    id: number;

    @Expose()
    email: string;

    password: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    cart: Wishlist

    @Expose()
    isAdmin: boolean;

}