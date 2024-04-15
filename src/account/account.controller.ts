import { Controller, Get, Param, NotFoundException, ConflictException, Post, Body, UseInterceptors, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { UsersService } from 'src/users/users.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { CreateProfileDto } from 'src/utils/dtos/profile/create-profile.dto';
import { WishlistService } from 'src/wishlist/wishlist.service';
import { User, Profile } from 'src/entities';
import { CreateUserDto } from 'src/utils/dtos/users/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { ResponseUserDto } from 'src/utils/dtos/users/response-user.dto';
import { SerializerInterceptor } from 'src/utils/interceptors/serialize.interceptor';
import { SignInUserDto } from 'src/utils/dtos/users/signin-user.dto';

@Controller('account')
export class AccountController {
    constructor(
        private accountService: AccountService, 
        private usersService: UsersService, 
        private profilesService: ProfilesService, 
        private wishlistService: WishlistService,
        private authService: AuthService){}

    @UseInterceptors(new SerializerInterceptor(ResponseUserDto))
    @Post('sign-up')
    async createAccount(@Body() body: CreateUserDto){
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

    @Post('sign-in')
    async enterAccount(@Body() body: SignInUserDto){
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

    @Get(':id/profiles')
    async getAccountProfiles(@Param('id') id: string){
        const user: User[] = await this.usersService.find(null,Number(id))
        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return await this.profilesService.findByUser(user[0])
    }

    @Post(':id/profiles')
    async addProfileToAccount(@Param('id') id: string, @Body() body: CreateProfileDto){
        const user: User[] = await this.usersService.find(null,Number(id))
        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`)
        }else if(user[0].profiles.length>=3){
            throw new ConflictException('Limit of profiles for a user reached')
        }

        const newProfile = await this.profilesService.createProfile(body);
        await this.wishlistService.createWishlist({profile: newProfile});
        return (await this.usersService.addProfileToUser(user[0], newProfile)).profiles;
    }

    @Delete(':id/profiles/:profileId')
    async removeProfilefromAccount(@Param('id') id: string, @Param('profileId') profileId: string){
        const user: User[] = await this.usersService.find(null,Number(id))

        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`)
        }else if(user[0].profiles.length===1){
            throw new ConflictException('User must have at least one profile')
        }
        const profileToDelete = user[0].profiles.filter(pro=>pro.id===Number(profileId));
        console.log("profileToDelete::: ", profileToDelete)
        const wishlistToDelete = await this.profilesService.find(profileToDelete[0].id);
        console.log("wishlistToDelete::: ", wishlistToDelete)
        //await this.usersService.removeProfileFromUser(user[0], profileToDelete[0]);
        return await this.profilesService.deleteProfile(profileToDelete[0])
        //return await this.wishlistService.deleteWishlist(wishlistToDelete[0].wishlist);
    }
}
