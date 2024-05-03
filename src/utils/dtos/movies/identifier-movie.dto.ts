import { Expose } from 'class-transformer'
import {} from 'class-validator'
export class IdentifierMovieDto{
    @Expose()
    id: number;
    
    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    original: boolean;

    @Expose()
    ageLimit: number;
}