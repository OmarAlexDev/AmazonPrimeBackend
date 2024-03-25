import { Injectable } from '@nestjs/common';
import { Cart, User } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartService {
    constructor(@InjectRepository(Cart) private repo: Repository<Cart>){}

    async createCart(user: User){
        const cart =  this.repo.create();
        cart.user=user;
        return await this.repo.save(cart)   
    }
}
