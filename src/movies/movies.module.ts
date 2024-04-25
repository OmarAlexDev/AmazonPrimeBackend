import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Movie } from 'src/utils/entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MoviesController],
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService],
  exports: [MoviesService]
})
export class MoviesModule {}
