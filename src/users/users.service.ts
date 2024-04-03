import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from '../utils/dtos/users/create-user.dto';
import { User } from '../entities/';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>, private profilesService: ProfilesService){}

    async addUser(user: CreateUserDto){
        const newUser =  this.repo.create(user);
        const defaultProfile = await this.profilesService.createProfile(newUser.firstName, newUser);
        newUser.profiles=[defaultProfile];
        return newUser;
    }

    find(email: string){
        return this.repo.findOneBy({email}) 
    }

    async findAll (){
        return await this.repo.find()
    }
}
