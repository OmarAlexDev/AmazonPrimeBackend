import { Controller, Post, Body } from '@nestjs/common';
import { MoviesService } from 'src/movies/movies.service';
import { AddMovieToWishlistDTO } from 'src/utils/dtos/wishlist/add-movie.dto';
import { WishlistService } from './wishlist.service';
import { DataSource } from 'typeorm';

@Controller('wishlist')
export class WishlistController {
    constructor(private wishlistService: WishlistService, private dataSource: DataSource){}
    
}
