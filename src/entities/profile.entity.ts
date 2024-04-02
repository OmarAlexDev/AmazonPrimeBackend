import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

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
}