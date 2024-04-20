import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Wishlist } from 'src/utils/entities';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  providers: [WishlistService],
  imports: [TypeOrmModule.forFeature([Wishlist])],
  exports: [WishlistService],
  controllers: [WishlistController]
})
export class WishlistModule {}
