import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable} from "typeorm";
import { Movie } from "./movie.entity";
import { Profile } from "./profile.entity";

@Entity()
export class Wishlist{
    @PrimaryGeneratedColumn()
    id: number
    
    @OneToOne(()=> Profile, (profile)=>profile.wishlist, {cascade:true})
    profile: Profile

    @ManyToMany(() => Movie)
    @JoinTable()
    movies:  Movie []
}