import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { AdminGuard } from 'src/utils/guards/admin.guard';

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
}
