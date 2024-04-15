import { Injectable } from '@nestjs/common';
import { Wishlist } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishlistDto } from 'src/utils/dtos/wishlist/create-wishlist.dto';

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

}
