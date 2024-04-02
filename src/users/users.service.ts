import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from '../utils/dtos/users/create-user.dto';
import { User } from '../entities/';
import { WishlistService } from 'src/wishlist/wishlist.service';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>, private wishlistService: WishlistService){}

    async addUser(user: CreateUserDto){
        const newUser =  this.repo.create(user);
        const savedUser = await this.repo.save(newUser)
        await this.wishlistService.createWishlist(savedUser);
        return savedUser;
    }

    find(email: string){
        return this.repo.findOneBy({email}) 
    }

    async findAll (){
        return await this.repo.find()
    }
}
