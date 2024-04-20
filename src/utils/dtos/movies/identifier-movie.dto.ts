import { Expose } from 'class-transformer'
import {} from 'class-validator'
export class IdentifierMovieDto{
    @Expose()
    id: number;
}