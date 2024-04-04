import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Wishlist } from "./wishlist.entity";

@Entity()
export class Profile{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({default: false})
    forKids: boolean;

    @ManyToOne(()=>User, (user)=>user.profiles, {
        cascade: true
    })
    user: User;

    @OneToOne(()=> Wishlist, (wishlist)=>wishlist.profile)
    @JoinColumn()
    wishlist: Wishlist;
}