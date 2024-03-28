import {Expose} from 'class-transformer'
import { Cart } from 'src/entities';

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
    cart: Cart

    @Expose()
    isAdmin: boolean;

}