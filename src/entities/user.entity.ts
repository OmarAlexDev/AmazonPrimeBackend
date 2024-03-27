import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import { Exclude } from "class-transformer";

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

}