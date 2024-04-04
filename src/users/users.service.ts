import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from '../utils/dtos/users/create-user.dto';
import { User, Profile, Wishlist } from '../entities/';
import { ProfilesService } from 'src/profiles/profiles.service';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>, private dataSource: DataSource){}

    async addUser(user: CreateUserDto){
        const newUser =  this.repo.create(user);

        const defaultProfile = new Profile();
        defaultProfile.username = newUser.firstName;
        defaultProfile.user = newUser;

        const defaultWishlist = new Wishlist();
        defaultWishlist.profile = defaultProfile;

        newUser.profiles=[defaultProfile];

        await this.dataSource.manager.save(defaultWishlist);
        return newUser;
    }

    find(email: string){
        return this.repo.findOneBy({email}) 
    }

    async findAll (){
        return await this.repo.find()
    }
}
