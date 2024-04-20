import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from '../utils/dtos/users/create-user.dto';
import { User, Profile, Wishlist } from '../utils/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>, private dataSource: DataSource){}

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

    async deleteUser(user: Partial<User>){
        return await this.repo.delete(user);
    }

    addProfileToUser(user: User, profile: Profile){
        user.profiles ? user.profiles.push(profile) : user.profiles = [profile]
        return this.repo.save(user);
    }

    removeProfileFromUser(user: User, profile: Profile){
        user.profiles  = user.profiles.filter(pro=>pro.id!==profile.id)
        return this.repo.save(user);
    }
}
