import { Injectable } from '@nestjs/common';
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

    async addProfileToUser(user: User, profile: Profile){
        user.profiles ? user.profiles.push(profile) : user.profiles = [profile]
        return this.repo.save(user);
    }

    async removeProfileFromUser(user: User, profile: Profile){
        user.profiles  = user.profiles.filter(pro=>pro.id!==profile.id)
        return this.repo.save(user);
    }

    async updateUser(id: number, newUser: Partial<User>){
        if(newUser.password){
            newUser.password = await encrypt(newUser.password);
        }
        return await this.repo.update(id, newUser);
    }
}
