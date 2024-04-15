import { Controller, Get, Param, NotFoundException, ConflictException, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { UsersService } from 'src/users/users.service';
import { request } from 'http';
import { ProfilesService } from 'src/profiles/profiles.service';
import { CreateProfileDto } from 'src/utils/dtos/profile/create-profile.dto';
import { WishlistService } from 'src/wishlist/wishlist.service';
import { User } from 'src/entities';
import { CreateUserDto } from 'src/utils/dtos/users/create-user.dto';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService, private usersService: UsersService, private profilesService: ProfilesService, private wishlistService: WishlistService){}

    @Post('/')
    async createAccount(@Body() body: CreateUserDto){
        const newUser =  await this.usersService.createUser(body)
        const newProfile = await this.profilesService.createProfile({username: newUser.firstName});
        await this.wishlistService.createWishlist({profile: newProfile});
        return await this.usersService.addProfileToUser(newUser, newProfile);
    }

    @Get('/:id/profiles')
    async getProfiles(@Param('id') id: string){
        const user: User[] = await this.usersService.find(null,Number(id))
        if(user.length===0){
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return await this.profilesService.findByUser(user[0])
    }

    @Post('/:id/profiles')
    async newProfile(@Param('id') id: string, @Body() body: CreateProfileDto){
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
}
