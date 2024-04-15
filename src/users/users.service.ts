import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from '../utils/dtos/users/create-user.dto';
import { User, Profile, Wishlist } from '../entities/';
import { DataSource, In } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>, private dataSource: DataSource){}

    /*async addUser(user: CreateUserDto){
        
        const defaultProfile = new Profile();
        defaultProfile.username = user.firstName;
        const savedProfile = await this.dataSource.manager.save(defaultProfile);

        const defaultWishlist = new Wishlist();
        defaultWishlist.profile = savedProfile;
        await this.dataSource.manager.save(defaultWishlist);

        const newUser =  this.repo.create(user);
        newUser.profiles=[savedProfile];
        
        return await this.repo.save(newUser);
    }*/

    async createUser(user:CreateUserDto){
        const newUser = this.repo.create(user);
        return await this.repo.save(newUser);
    }

    async find(email?: string, id?: number){
        return await this.repo.find({
            where: [
                {email: email},
                {id: id}
            ],
            take: 1,
            relations: {profiles:true}
        }) 
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

        if(userProfiles && userProfiles.length>0){
            await this.dataSource.createQueryBuilder()
            .delete()
            .from(Profile)
            .where("userId = :id", { id: id })
            .execute();

            await this.dataSource
            .createQueryBuilder()
            .delete()
            .from(Wishlist)
            .where("Id IN (:...userProfiles)",{userProfiles})
            .execute();
        }

        return await this.dataSource.createQueryBuilder()
            .delete()
            .from(User)
            .where("Id = :id",{id:id})
            .execute();
    }

    addProfileToUser(user: User, profile: Profile){
        user.profiles.push(profile);
        return this.repo.save(user);
    }
}
