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
        return this.accountService.createAccount(body);
    }

    @Post('sign-in')
    async enterAccount(@Body() body: SignInUserDto){
        return this.accountService.enterAccount(body);
    }

    @Get(':id/profiles')
    async getAccountProfiles(@Param('id') id: string){
        return this.accountService.getAccountProfiles(Number(id));
    }

    @Post(':id/profiles')
    async addProfileToAccount(@Param('id') id: string, @Body() body: CreateProfileDto){
        return this.accountService.addProfileToAccount(Number(id), body);
    }

    @Delete(':id/profiles/:profileId')
    async removeProfileFromAccount(@Param('id') id: string, @Param('profileId') profileId: string){
        return this.accountService.removeProfileFromAccount(Number(id), profileId);
    }
}
