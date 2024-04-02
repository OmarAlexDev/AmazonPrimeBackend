import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { User } from "./index";

@Entity()
export class Wishlist{
    @PrimaryGeneratedColumn()
    id: number

    @Column({default:0})
    quantity: number;

    @OneToOne(()=>User)
    @JoinColumn()
    user: User

}