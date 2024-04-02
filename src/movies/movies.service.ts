import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/utils/dtos/movies/create-movie.dto';

@Injectable()
export class MoviesService {


    constructor(@InjectRepository(Movie) private repo: Repository<Movie>){}

    async createMovie(movie: CreateMovieDto){
        const newMovie = this.repo.create(movie)
        return await this.repo.save(newMovie);
    }

    async findMovieById(id:number){
        return await this.repo.findOneBy({id});
    }

    async findMovie({title, categories, year, ageLimit, imdb, studio}: Partial<Movie>){
        const query = this.repo.createQueryBuilder("movie")
        title && query.orWhere("title = :title", {title})
        year && query.orWhere("year = :year",{year})
        ageLimit && query.orWhere("ageLimit = :ageLimit",{ageLimit})
        imdb && query.orWhere("imdb = :imdb",{imdb})
        studio && query.orWhere("studio = :studio",{studio})
        if(categories){
            categories.split(',').forEach(element => {
                query.orWhere(`categories LIKE '%${element}%'`)
            });
        }
        return await query.getMany();
    }

    async updateMovie(movie: Movie, content: Partial<Movie>){
        return await this.repo.save({id:movie.id, ...movie, ...content})
    }

    async deleteMovie(id:number){
        return await this.repo.createQueryBuilder()
        .delete()
        .from(Movie)
        .where("id = :id", { id: id })
        .execute();
    }
}
