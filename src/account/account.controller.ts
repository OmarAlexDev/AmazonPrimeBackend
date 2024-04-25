import { Controller, Get, Param, Post, Body, Patch, UseInterceptors, Delete, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateProfileDto } from 'src/utils/dtos/profile/create-profile.dto';
import { SerializerInterceptor } from 'src/utils/interceptors/serialize.interceptor';
import { AddMovieToWishlistDTO } from 'src/utils/dtos/wishlist/add-movie.dto';
import { UpdateProfileDto } from 'src/utils/dtos/profile/update-profile.dto';
import { IdentifierMovieDto } from 'src/utils/dtos/movies/identifier-movie.dto';
import { AuthGuard } from 'src/utils/guards/auth.guard';
import { UpdateUserDto } from 'src/utils/dtos/users/update-user.dto';

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService){}

    @Delete(':id')
    async deleteAccount(@Param('id') id: string){
        return this.accountService.deleteAccount(Number(id));
    }

    @Patch(':id')
    async updateAccountUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.accountService.updateAccountsUser(Number(id), body);
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

    @Post(':id/profiles/:profileId/wishlist')
    async addMovieToProfilesWishlist(@Param('id') id:string, @Param('profileId') profileId: string, @Body() body: AddMovieToWishlistDTO){
        return this.accountService.addMovieToProfilesWishlist(Number(id),Number(profileId), Number(body.movieId))
    }

    @Delete(':id/profiles/:profileId/wishlist')
    async removeMovieFromProfilesWishlist(@Param('id') id:string, @Param('profileId') profileId: string, @Body() body: AddMovieToWishlistDTO){
        return this.accountService.removeMovieFromProfilesWishlist(Number(id),Number(profileId), Number(body.movieId))
    }

    @Get(':id/profiles/:profileId/wishlist')
    @UseInterceptors(new SerializerInterceptor(IdentifierMovieDto))
    async getMoviesFromProfilesWishlist(@Param('id') id:string, @Param('profileId') profileId: string){
        return this.accountService.getMoviesFromProfilesWishlist(Number(id),Number(profileId))
    }
}
