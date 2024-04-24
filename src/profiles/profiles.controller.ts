import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

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

}
