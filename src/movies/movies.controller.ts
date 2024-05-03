import { Controller, ConflictException, UseInterceptors, Param, Patch, NotFoundException, Delete, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import {Body, Post, Get, Query} from '@nestjs/common'
import { CreateMovieDto } from 'src/utils/dtos/movies/create-movie.dto';
import { FilterMovie } from 'src/utils/dtos/movies/filter-movie.dto';
import { UpdateMovieDto } from 'src/utils/dtos/movies/update-movie.dto';
import { SerializerInterceptor } from 'src/utils/interceptors/serialize.interceptor';
import { ResponseMovieDto } from 'src/utils/dtos/movies/response-movie.dto';
import { AdminGuard } from 'src/utils/guards/admin.guard';
import { SubscriptionGuard } from 'src/utils/guards/subscription.guard';


@UseInterceptors(new SerializerInterceptor(ResponseMovieDto))
@Controller('movies')
export class MoviesController {
    constructor(private moviesService : MoviesService){}

    //@UseGuards(AdminGuard)
    @Post()
    async createMovie(@Body() body: CreateMovieDto){
        const movies = await this.moviesService.findMovie({title: body.title})
        if(movies.length>0){
           throw new ConflictException('Movie already exists') 
        }
        return this.moviesService.createMovie(body);
    }

    @UseGuards(AdminGuard)
    @Patch('/:id')
    async updateMovie(@Param('id') id: string, @Body() body: UpdateMovieDto){
        const movie = await this.moviesService.findMovieById(Number(id));
        if(!movie){
            throw new NotFoundException("Movie with given id not found");
        }
        return await this.moviesService.updateMovie(movie, body)
    }

    @UseGuards(SubscriptionGuard)
    @Get()
    async getMovies(@Query() {title, categories, year, ageLimit, imdb, studio}: FilterMovie){
        return await this.moviesService.findMovie({title, categories, year, ageLimit, imdb, studio})
    }

    @UseGuards(SubscriptionGuard)
    @Get('/:id')
    async getMovie(@Param('id') id: string){
        return await this.moviesService.findMovieById(Number(id));
    }

    //@UseGuards(AdminGuard)
    @Delete('/:id')
    async deleteMovie(@Param('id') id : string){
        if(!await this.moviesService.findMovieById(Number(id))){
            throw new NotFoundException("Movie not found");
        }
        return await this.moviesService.deleteMovie(Number(id));
    }
}
