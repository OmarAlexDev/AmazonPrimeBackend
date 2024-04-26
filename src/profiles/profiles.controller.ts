import { Controller, Delete, Get, Param, UseGuards, Post,  Body } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { AdminGuard } from 'src/utils/guards/admin.guard';
import { CreateProfileDto } from 'src/utils/dtos/profile/create-profile.dto';

@UseGuards(AdminGuard)
@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService){}

    @Get()
    getProfiles(){
        return this.profilesService.findAll()
    }

    @Get('/:id')
    getProfile(@Param('id') id: string){
        return this.profilesService.find(Number(id))
    }

    @Delete('/:id')
    deleteProfile(@Param('id') id: string){
        return this.profilesService.deleteProfile({id: Number(id)})
    }

    @Post()
    createProfile(@Body() body: CreateProfileDto){
        return this.profilesService.createProfile(body)
    }
}
