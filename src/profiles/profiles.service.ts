import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, User } from 'src/entities';
import { CreateProfileDto } from 'src/utils/dtos/profile/create-profile.dto';
import { Repository } from 'typeorm';


@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private repo: Repository<Profile>){}

    async find(id:number){
        return await this.repo.findOneBy({id});
    }

    async findAll(){
        return await this.repo.find();
    }

    async findByUser(user: User){
        return await this.repo.findBy({user: user})
    }

    async createProfile(profile: Partial<Profile>){
        const newProfile = this.repo.create(profile)
        return await this.repo.save(newProfile);
    }
}
