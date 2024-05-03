import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string;

    @Column({default: 90})
    duration: number;

    @Column()
    year: number;

    @Column({default: 5})
    ageLimit: number;

    @Column({nullable: true})
    categories: string;

    @Column({nullable: true})
    studio: string;
    
    @Column({nullable: true})
    imdb: number;

    @Column({default: false})
    original: boolean;

    @Column({default: 'None available'})
    description: string;

    @Column({default: 'None available'})
    subtitles: string;

    @Column({default: 'Español'})
    languages: string;

    @Column({nullable: true})
    directors: string;

    @Column({nullable: true})
    producers: string;

    @Column({nullable: true})
    starring: string;
    
}