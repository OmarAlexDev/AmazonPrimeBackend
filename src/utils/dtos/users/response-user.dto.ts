import {Expose} from 'class-transformer'
import { Wishlist } from 'src/utils/entities';

export class ResponseUserDto{

    id: number;

    @Expose()
    phone: string;

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