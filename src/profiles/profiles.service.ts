import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, User, Movie, Wishlist } from 'src/utils/entities';
import { CreateProfileDto } from 'src/utils/dtos/profile/create-profile.dto';
import { In, Repository } from 'typeorm';


@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private repo: Repository<Profile>){}

    async find(id?: number){
        return await this.repo.find({
            where: [
                {id: id}
            ],
            relations: {wishlist:true}
        }) 
    }

    async findAll(){
        return await this.repo.find();
    }

    async findByUser(user: Partial<User>){
        return await this.repo.findBy({user: user});
    }

    async createProfile(profile: Partial<Profile>){
        const newProfile = this.repo.create(profile)
        return await this.repo.save(newProfile);
    }

    async deleteProfile(profile: Partial<Profile>){
        return await this.repo.delete(profile);
    }

    async deleteProfiles(profiles: Profile []){
        return await this.repo.remove(profiles);
    }

    async updateProfile(profile: Partial<Profile>, newProfile: Partial<Profile>){
        return await this.repo.update(profile.id, newProfile);
    }

    async getProfilesWishlists(profiles: Profile []){
        const ids = profiles.map(prof=> {
            return prof.id
        })
        const wishlists = await this.repo.find({
            where: [
                {id: In (ids)}
            ],
            relations: {wishlist:true}
        }) 
        return wishlists.map(prof=>{return prof.wishlist});
    }
}
