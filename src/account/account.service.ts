import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { WishlistService } from 'src/wishlist/wishlist.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/utils/dtos/users/create-user.dto';
import { SignInUserDto } from 'src/utils/dtos/users/signin-user.dto';
import { CreateProfileDto } from 'src/utils/dtos/profile/create-profile.dto';
import { User } from 'src/entities';

@Injectable()
export class AccountService {
    constructor( 
        private usersService: UsersService, 
        private profilesService: ProfilesService, 
        private wishlistService: WishlistService,
        private authService: AuthService){}

    async createAccount(body: CreateUserDto){
        const existingUser: User [] = await this.usersService.find(body.email,null);
        if(existingUser.length > 0){
            throw new NotFoundException(`User with email ${body.email} already exists`)
        }
        body.password =  await this.authService.encrypt(body);
        const newUser =  await this.usersService.createUser(body)
        const newProfile = await this.profilesService.createProfile({username: newUser.firstName});
        await this.wishlistService.createWishlist({profile: newProfile});
        return await this.usersService.addProfileToUser(newUser, newProfile);
    }

    async enterAccount(body: SignInUserDto){
        const existingUser: User []  = await this.usersService.find(body.email,null);
        if(existingUser.length===0){
            throw new NotFoundException(`User with email ${body.email} not found`)
        }
        if(!this.authService.decrypt(body.password,existingUser[0].password)){
            throw new NotFoundException("Incorrect password")
        }
        const token = this.authService.generateToken(existingUser[0])

        return {
            token: token,
            id: existingUser[0].id,
            email: existingUser[0].email
        }
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
            throw new NotFoundException(`User with id ${id} not found`)
        }else if(user[0].profiles.length>=3){
            throw new ConflictException('Limit of profiles for a user reached')
        }

        const newProfile = await this.profilesService.createProfile(body);
        await this.wishlistService.createWishlist({profile: newProfile});
        return (await this.usersService.addProfileToUser(user[0], newProfile)).profiles;
    }

    async removeProfileFromAccount(id: number, profileId: string){
        const user: User[] = await this.usersService.find(null,id)

        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`);
        }else if(user[0].profiles.length===1){
            throw new ConflictException('User must have at least one profile')
        }
        const profileToDelete = user[0].profiles.filter(pro=>pro.id===Number(profileId));
        if(profileToDelete.length===0){
            throw new NotFoundException(`Profile with id ${profileId} not found for user with id ${id}`)
        }
        console.log("profileToDelete::: ", profileToDelete)
        const wishlistToDelete = await this.profilesService.find(profileToDelete[0].id);
        console.log("wishlistToDelete::: ", wishlistToDelete)
        return await this.profilesService.deleteProfile(profileToDelete[0])
        //return await this.wishlistService.deleteWishlist(wishlistToDelete[0].wishlist);
    }
}
