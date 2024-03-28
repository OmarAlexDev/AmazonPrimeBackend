import { Controller, ConflictException, UseInterceptors, UseGuards, Param, Put, NotFoundException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import {Body, Post, Get, Query} from '@nestjs/common'
import { CreateMovieDto } from 'src/utils/dtos/movies/create-movie.dto';
import { FilterMovie } from 'src/utils/dtos/movies/filter-movie.dto';
import { UpdateMovieDto } from 'src/utils/dtos/movies/update-movie.dto';
import { SerializerInterceptor } from 'src/utils/interceptors/serialize.interceptor';
import { ResponseMovieDto } from 'src/utils/dtos/movies/response-movie.dto';
import { AdminGuard } from 'src/utils/guards/admin.guard';

@UseInterceptors(new SerializerInterceptor(ResponseMovieDto))
@Controller('movies')
export class MoviesController {
    constructor(private moviesService : MoviesService){}

    @UseGuards(AdminGuard)
    @Post()
    async createMovie(@Body() body: CreateMovieDto){
        const movies = await this.moviesService.findMovie({title: body.title})
        if(movies.length>0){
           throw new ConflictException('Movie already exists') 
        }
        return this.moviesService.createMovie(body);
    }

    @UseGuards(AdminGuard)
    @Put('/:id')
    async updateMovie(@Param('id') id: string, @Body() body: UpdateMovieDto){
        if(!await this.moviesService.findMovieById(Number(id))){
            throw new NotFoundException("User not found");
        }
        return await this.moviesService.updateMovie(Number(id), body)
    }

    @Get()
    async getMovies(@Query() {title, categories, year, ageLimit, imdb, studio}: FilterMovie){
        return await this.moviesService.findMovie({title, categories, year, ageLimit, imdb, studio})
    }

    @Get('/:id')
    async getMovie(@Param('id') id: string){
        return await this.moviesService.findMovieById(Number(id));
    }
}
