import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, User } from 'src/entities';
import { Repository } from 'typeorm';


@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private repo: Repository<Profile>){}

    async createProfile(username: string, user: User){
         const profile =  this.repo.create({username, user});
         return await this.repo.save(profile);
    }

}
