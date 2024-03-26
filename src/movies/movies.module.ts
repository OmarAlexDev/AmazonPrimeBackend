import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Movie } from 'src/entities';

@Module({
  controllers: [MoviesController],
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService]
})
export class MoviesModule {}
