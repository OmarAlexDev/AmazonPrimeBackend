import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column({nullable: true})
    category: string;

    @Column({nullable: true})
    brand: string;

    @Column()
    price: number;

    @Column({nullable: true})
    description: string;

    @Column({default: 0})
    quantity_on_inventory: number;
}