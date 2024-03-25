import { Entity, Column, PrimaryGeneratedColumn,OneToOne} from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    firstName: string

    @Column({default:""})
    lastName: string

}