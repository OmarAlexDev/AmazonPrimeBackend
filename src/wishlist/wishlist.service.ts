import { Injectable } from '@nestjs/common';
import { Wishlist } from 'src/utils/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishlistDto } from 'src/utils/dtos/wishlist/create-wishlist.dto';
import { Movie } from 'src/utils/entities';

@Injectable()
export class WishlistService {
    constructor(@InjectRepository(Wishlist) private repo: Repository<Wishlist>){}

    async createWishlist(wishlist: Partial<CreateWishlistDto>){
        const newWishlist = this.repo.create(wishlist)
        return await this.repo.save(newWishlist);
    }

    async deleteWishlist(wishlist: Partial<Wishlist>){
        return await this.repo.delete(wishlist);
    }

    async deleteWishlists(wishlists: Wishlist []){
        return await this.repo.remove(wishlists);
    }

    async findWishlist(wishlist: Partial<Wishlist>){
        return await this.repo.find({
            where: [
                {id: wishlist.id}
            ],
            relations: {movies:true}
        })
    }

    async addMovieToWishlist(wishlist : Wishlist, movie : Movie){
        wishlist.movies ? wishlist.movies.push(movie) : wishlist.movies = [movie];
        return this.repo.save(wishlist);
    }

    async removeMovieFromWishlist(wishlist : Wishlist, movie : Movie){
        wishlist.movies = wishlist.movies.filter(mov=>mov.id!==movie.id)
        return this.repo.save(wishlist);
    }

}
