import { Entity, PrimaryGeneratedColumn, ManyToOne,OneToOne, ManyToMany, JoinTable, Column, JoinColumn } from "typeorm";
import {History, Movie} from './index'

@Entity()
export class Record{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Movie)
    @JoinColumn()
    movie: Movie;

    @ManyToOne(()=>History, (history)=>history.records)
    history: History;

    @Column({default: 0.0})
    watch_time: number;

    @Column({default: false})
    finished: boolean;
} 