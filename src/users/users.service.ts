import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from '../utils/dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    addUser(user: CreateUserDto){
        const savedUser =  this.repo.create(user);
        return this.repo.save(savedUser);
    }

    find(email: string){
        return this.repo.findOneBy({email}) 
    }

    async findAll (){
        return await this.repo.find()
    }
}
