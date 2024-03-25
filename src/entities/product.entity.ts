import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column({nullable: true})
    category: string;

    @Column()
    price: number;

    @Column({nullable: true})
    description: string;

    @Column({default: 0})
    quantity_on_inventory: number;

    @ManyToOne(()=>Order, (order)=>order.products)
    order: Order
}