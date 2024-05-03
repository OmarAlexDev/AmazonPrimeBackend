import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {Movie, Record, Profile} from './index'

@Entity()
export class History{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(()=> Profile, (profile)=>profile.history)
    profile: Profile

    @OneToMany(()=>Record, (record)=> record.history)
    records: Record [];
} 