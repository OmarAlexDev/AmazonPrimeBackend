import { Entity, PrimaryGeneratedColumn, ManyToOne,OneToOne, ManyToMany, JoinTable, Column } from "typeorm";
import {History, Movie} from './index'

@Entity()
export class Record{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Movie)
    @JoinTable()
    movie: Movie;

    @ManyToOne(()=>History, (history)=>history.records)
    history: History;

    @Column({default: 0.0})
    watch_time: number;
} 