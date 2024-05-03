import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { WishlistService } from 'src/wishlist/wishlist.service';
import { CreateProfileDto } from 'src/utils/dtos/profile/create-profile.dto';
import { Movie, User } from 'src/utils/entities';
import { MoviesService } from 'src/movies/movies.service';
import { UpdateProfileDto } from 'src/utils/dtos/profile/update-profile.dto';
import { UpdateUserDto } from 'src/utils/dtos/users/update-user.dto';
import { HistoryService } from 'src/history/history.service';
import { RecordService } from 'src/record/record.service';

@Injectable()
export class AccountService {
    constructor( 
        private usersService: UsersService, 
        private profilesService: ProfilesService, 
        private wishlistService: WishlistService,
        private moviesService: MoviesService,
        private historyService: HistoryService,
        private recordService: RecordService
    ){}

    async deleteAccount(id: number){
        const existingUser: User [] = await this.usersService.find(null,id);
        if(existingUser.length === 0){
            throw new NotFoundException(`User with id ${id} not found`);
        }
        const profilewishlists = await this.profilesService.getProfilesWishlists(existingUser[0].profiles);
        const profileHistories = await this.profilesService.getProfilesHistories(existingUser[0].profiles);
        await this.profilesService.deleteProfiles(existingUser[0].profiles);
        await this.usersService.deleteUser({id: existingUser[0].id});
        await this.wishlistService.deleteWishlists(profilewishlists);
        return await this.historyService.deleteHistories(profileHistories);
    }

    async updateAccountsUser(id: number, body: UpdateUserDto){ 
        const existingUser: User [] = await this.usersService.find(null,id);
        if(existingUser.length === 0){
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return await this.usersService.updateUser(existingUser[0].id, body);
    }

    async getAccountProfiles(id: number){
        const user: User[] = await this.usersService.find(null,id)
        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return await this.profilesService.findByUser(user[0])
    }

    async addProfileToAccount(id: number, body: CreateProfileDto){
        const user: User[] = await this.usersService.find(null,id);
        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`);
        }else if(user[0].profiles.length>=3){
            throw new ConflictException('Limit of profiles for a user reached');
        }else if(user[0].profiles.find(prof=>prof.username===body.username)){
            throw new ConflictException('Username already in use for other profile');
        }

        const newProfile = await this.profilesService.createProfile(body);
        await this.wishlistService.createWishlist({profile: newProfile});
        await this.historyService.createHistory({profile: newProfile});
        return (await this.usersService.addProfileToUser(user[0], newProfile)).profiles;
    }

    async removeProfileFromAccount(id: number, profileId: number){
        const user: User[] = await this.usersService.find(null,id)

        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`);
        }else if(user[0].profiles.length===1){
            throw new ConflictException('User must have at least one profile')
        }
        const profileToDelete = user[0].profiles.filter(pro=>pro.id===profileId);
        if(profileToDelete.length===0){
            throw new NotFoundException(`Profile with id ${profileId} not found for user with id ${id}`)
        }
        const wishlistToDelete = await this.profilesService.find(profileToDelete[0].id);
        await this.profilesService.deleteProfile({id: profileToDelete[0].id});
        await this.historyService.deleteHistory({id: wishlistToDelete[0].history.id});
        return await this.wishlistService.deleteWishlist({id: wishlistToDelete[0].wishlist.id});
    }

    async updateProfileFromAccount(id: number, profileId: number, body:UpdateProfileDto){
        const user: User[] = await this.usersService.find(null,id)

        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`);
        }else if(user[0].profiles.find(prof=>prof.username===body.username)){
            throw new ConflictException('Username already in use for other profile');
        }
        const profileToDelete = user[0].profiles.filter(pro=>pro.id===profileId);
        if(profileToDelete.length===0){
            throw new NotFoundException(`Profile with id ${profileId} not found for user with id ${id}`)
        }
        const currentProfile = await this.profilesService.find(profileToDelete[0].id);
        return await this.profilesService.updateProfile(currentProfile[0].id, body);
    }

    async addMovieToProfilesWishlist(id:number, profileId: number, movieId: number){
        const user: User[] = await this.usersService.find(null,id)
        const movie: Movie = await this.moviesService.findMovieById(movieId)

        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`);
        }else if(!movie){
            throw new NotFoundException(`Movie with id ${movieId} not found`)
        }
        const currentProfile = user[0].profiles.filter(pro=>pro.id===profileId);
        if(currentProfile.length===0){
            throw new NotFoundException(`Profile with id ${profileId} not found for user with id ${id}`)
        }
        const profile = await this.profilesService.find(currentProfile[0].id);
        const wishlist = await this.wishlistService.findWishlist(profile[0].wishlist);

        if(wishlist[0].movies.find(mov=>mov.id===movieId)){
            throw new ConflictException('Movie already added to wishlist')
        }
        return await this.wishlistService.addMovieToWishlist(wishlist[0], movie);
    }

    async removeMovieFromProfilesWishlist(id:number, profileId: number, movieId: number){
        const user: User[] = await this.usersService.find(null,id)
        const movie: Movie = await this.moviesService.findMovieById(movieId)

        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`);
        }else if(!movie){
            throw new NotFoundException(`Movie with id ${movieId} not found`)
        }
        const currentProfile = user[0].profiles.filter(pro=>pro.id===profileId);
        if(currentProfile.length===0){
            throw new NotFoundException(`Profile with id ${profileId} not found for user with id ${id}`)
        }
        const profile = await this.profilesService.find(currentProfile[0].id);
        const wishlist = await this.wishlistService.findWishlist(profile[0].wishlist);

        if(!wishlist[0].movies.find(mov=>mov.id===movieId)){
            throw new ConflictException(`Movie with id ${movieId} not found in profile with id ${profileId} wishlist`)
        }
        return await this.wishlistService.removeMovieFromWishlist(wishlist[0], movie);
    }

    
    async getMoviesFromProfilesWishlist(id: number, profileId: number){
        const user: User[] = await this.usersService.find(null,id)

        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`);
        }
        const currentProfile = user[0].profiles.filter(pro=>pro.id===profileId);
        if(currentProfile.length===0){
            throw new NotFoundException(`Profile with id ${profileId} not found for user with id ${id}`)
        }
        const profile = await this.profilesService.find(currentProfile[0].id);
        const wishlist = await this.wishlistService.findWishlist(profile[0].wishlist);
        return wishlist[0].movies;
    }

    async addMovieToProfilesHistory(id:number, profileId: number, movieId: number){
        const user: User[] = await this.usersService.find(null,id)
        const movie: Movie = await this.moviesService.findMovieById(movieId)

        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`);
        }else if(!movie){
            throw new NotFoundException(`Movie with id ${movieId} not found`)
        }
        const currentProfile = user[0].profiles.filter(pro=>pro.id===profileId);
        if(currentProfile.length===0){
            throw new NotFoundException(`Profile with id ${profileId} not found for user with id ${id}`)
        }
        const profile = await this.profilesService.find(currentProfile[0].id);
        const history = await this.historyService.findHistory(profile[0].history);

        if(history[0].records.find(obj=>obj.movie.id===movieId)){
            throw new ConflictException('Movie already added to history')
        }
        const record = await this.recordService.createRecord({movie: movie});
        return await this.historyService.addMovieToHistory(history[0], record);
    }

    async getMoviesFromProfilesHistory(id: number, profileId: number){
        const user: User[] = await this.usersService.find(null,id)

        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`);
        }
        const currentProfile = user[0].profiles.filter(pro=>pro.id===profileId);
        if(currentProfile.length===0){
            throw new NotFoundException(`Profile with id ${profileId} not found for user with id ${id}`)
        }
        const profile = await this.profilesService.find(currentProfile[0].id);
        const history = await this.historyService.findHistory(profile[0].history);
        return history[0].records;
    }
}
