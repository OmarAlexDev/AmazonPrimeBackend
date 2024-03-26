import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Movie, Cart } from "./../entities";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total_quantity: number;

    @Column()
    totalPrice: number;

    @ManyToOne(()=>Cart, (cart)=>cart.orders)
    cart: Cart
}