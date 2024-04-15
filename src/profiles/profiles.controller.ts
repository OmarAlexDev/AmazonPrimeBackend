import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(private repo: ProfilesService){}

    @Get()
    getProfiles(){
        return this.repo.findAll()
    }

    @Get('/:id')
    getProfile(@Param('id') id: string){
        return this.repo.find(Number(id))
    }

    @Delete('/:id')
    deleteProfile(@Param('id') id: string){
        return this.repo.deleteProfile({id: Number(id)})
    }

}
