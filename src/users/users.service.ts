import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from '../utils/dtos/users/create-user.dto';
import { User, Profile, Wishlist } from '../entities/';
import { ProfilesService } from 'src/profiles/profiles.service';
import { DataSource, In } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>, private dataSource: DataSource){}

    async addUser(user: CreateUserDto){
        
        const defaultProfile = new Profile();
        defaultProfile.username = user.firstName;
        const savedProfile = await this.dataSource.manager.save(defaultProfile);

        const defaultWishlist = new Wishlist();
        defaultWishlist.profile = savedProfile;
        await this.dataSource.manager.save(defaultWishlist);

        const newUser =  this.repo.create(user);
        newUser.profiles=[savedProfile];
        
        return await this.repo.save(newUser);
    }

    async find(email?: string, id?: number){
        return await this.repo.findOneBy({email: email, id: id}) 
    }

    async findAll (){
        return await this.repo.find()
    }

    async deleteUser(id: number){
        const userProfiles =  (
            await this.dataSource
            .createQueryBuilder()
            .select("Id")
            .from(Profile, "profile")
            .where("userId = :id", { id: id })
            .getRawMany()
        ).map(el=>{return el.id});

        if(userProfiles.length>0){
            return await this.dataSource
                .createQueryBuilder()
                .select("wishlist")
                .from(Wishlist, "wishlist")
                .where("Id IN (:...userProfiles)",{userProfiles})
                .getRawMany();
        }
    }
}
