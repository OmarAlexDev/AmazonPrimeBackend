import { Injectable } from '@nestjs/common';
import { Wishlist, User } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishlistService {
    constructor(@InjectRepository(Wishlist) private repo: Repository<Wishlist>){}

    async createWishlist(user: User){
        const wishlist =  this.repo.create();
        wishlist.user=user;
        return await this.repo.save(wishlist)   
    }
}
