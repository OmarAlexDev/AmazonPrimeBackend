import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities';
import { Repository } from 'typeorm';


@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private repo: Repository<Profile>){}

    async findProfileById(id:number){
        return await this.repo.findOneBy({id});
    }
}
