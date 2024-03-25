import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Order, User } from "../entities/index";

@Entity()
export class Cart{
    @PrimaryGeneratedColumn()
    id: number

    @Column({default:0})
    quantity: number;

    @OneToOne(()=>User)
    @JoinColumn()
    user: User

    @OneToMany(()=>Order, (order=>order.cart))
    orders: Order[]
}