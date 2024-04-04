import { Injectable } from '@nestjs/common';
import { Wishlist } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishlistService {
    constructor(@InjectRepository(Wishlist) private repo: Repository<Wishlist>){}

    async addMovie(){

    }
}
