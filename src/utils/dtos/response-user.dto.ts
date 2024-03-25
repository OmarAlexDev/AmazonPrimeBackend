import {Expose} from 'class-transformer'

export class ResponseUserDto{

    @Expose()
    email: string;

    password: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;
    
    id: number;
}