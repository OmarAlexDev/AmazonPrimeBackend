import { Controller, Get, Param, Post, Body, Patch, UseInterceptors, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateProfileDto } from 'src/utils/dtos/profile/create-profile.dto';
import { CreateUserDto } from 'src/utils/dtos/users/create-user.dto';
import { ResponseUserDto } from 'src/utils/dtos/users/response-user.dto';
import { SerializerInterceptor } from 'src/utils/interceptors/serialize.interceptor';
import { SignInUserDto } from 'src/utils/dtos/users/signin-user.dto';
import { AddMovieToWishlistDTO } from 'src/utils/dtos/wishlist/add-movie.dto';
import { UpdateProfileDto } from 'src/utils/dtos/profile/update-profile.dto';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService){}

    @UseInterceptors(new SerializerInterceptor(ResponseUserDto))
    @Post('sign-up')
    async createAccount(@Body() body: CreateUserDto){
        return this.accountService.createAccount(body);
    }

    @Post('sign-in')
    async enterAccount(@Body() body: SignInUserDto){
        return this.accountService.enterAccount(body);
    }

    @Delete(':id')
    async deleteAccount(@Param('id') id: string){
        return this.accountService.deleteAccount(Number(id));
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
        return this.accountService.removeProfileFromAccount(Number(id), Number(profileId));
    }

    @Patch(':id/profiles/:profileId')
    async updateProfileFromAccount(@Param('id') id:string, @Param('profileId') profileId: string, @Body() body: UpdateProfileDto){
        return this.accountService.updateProfileFromAccount(Number(id), Number(profileId), body)
    }

    @Post(':id/profiles/:profileId/movies')
    async addMovieToProfilesWishlist(@Param('id') id:string, @Param('profileId') profileId: string, @Body() body: AddMovieToWishlistDTO){
        return this.accountService.addMovieToProfilesWishlist(Number(id),Number(profileId), Number(body.movieId))
    }

    @Delete(':id/profiles/:profileId/movies')
    async removeMovieFromProfilesWishlist(@Param('id') id:string, @Param('profileId') profileId: string, @Body() body: AddMovieToWishlistDTO){
        return this.accountService.removeMovieFromProfilesWishlist(Number(id),Number(profileId), Number(body.movieId))
    }

    @Get(':id/profiles/:profileId/movies')
    async getMoviesFromProfilesWishlist(@Param('id') id:string, @Param('profileId') profileId: string){
        return this.accountService.getMoviesFromProfilesWishlist(Number(id),Number(profileId))
    }
}
