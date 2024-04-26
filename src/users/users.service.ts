import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { AdminCreateUserDto } from 'src/utils/dtos/users/create-user-admin.dto';
import { User, Profile } from '../utils/entities';
import { encrypt } from 'src/utils/functions/bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    async createUser(user:Partial <AdminCreateUserDto>){
        user.password = await encrypt(user.password)
        const newUser = this.repo.create(user);
        return await this.repo.save(newUser);
    }

    async deleteUser(user: Partial<User>){
        user.profiles = [];
        return await this.repo.delete({id: user.id});
    }

    async updateUser(id: number, newUser: Partial<User>){
        if(newUser.password){
            newUser.password = await encrypt(newUser.password);
        }
        return await this.repo.update(id, newUser);
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

    async addProfileToUser(user: User, profile: Profile){
        user.profiles ? user.profiles.push(profile) : user.profiles = [profile]
        return this.repo.save(user);
    }

    async removeProfileFromUser(user: User, profile: Profile){
        if(user.profiles.length>=3){
            throw new ConflictException('Limit of profiles for a user reached');
        }else if(user.profiles.find(prof=>prof.username===profile.username)){
            throw new ConflictException('Username already in use for other profile');
        }
        user.profiles  = user.profiles.filter(pro=>pro.id!==profile.id)
        return this.repo.save(user);
    }
}
