import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Movie } from 'src/entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MoviesController],
  imports: [TypeOrmModule.forFeature([Movie]), AuthModule],
  providers: [MoviesService]
})
export class MoviesModule {}
