import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Wishlist } from 'src/entities';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  providers: [WishlistService],
  imports: [TypeOrmModule.forFeature([Wishlist]), MoviesModule],
  exports: [WishlistService],
  controllers: [WishlistController]
})
export class WishlistModule {}
