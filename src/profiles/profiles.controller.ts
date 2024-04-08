import { Controller, Get, Param } from '@nestjs/common';
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

}
