import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column({default: false})
    isAdmin: boolean;

    @OneToMany(()=>Profile, (profile)=> profile.user)
    profiles: Profile[]
}