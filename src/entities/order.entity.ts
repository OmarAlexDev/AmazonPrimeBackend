import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Product, Cart } from "./../entities";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total_quantity: number;

    @Column()
    totalPrice: number;

    @OneToMany(()=>Product, (product)=>product.order)
    products: Product []

    @ManyToOne(()=>Cart, (cart)=>cart.orders)
    cart: Cart
}