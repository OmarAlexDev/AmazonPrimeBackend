import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { History, User, Wishlist } from "./../entities/index";

@Entity()
export class Profile{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({default: false})
    forKids: boolean;

    @Column({default: null})
    pin: number;

    @ManyToOne(()=>User, (user)=>user.profiles)
    user: User;

    @OneToOne(()=> Wishlist, (wishlist)=>wishlist.profile)
    @JoinColumn()
    wishlist: Wishlist;

    @OneToOne(()=> History, (history)=>history.profile)
    @JoinColumn()
    history: History;
}