import { Controller, Get, Param, NotFoundException, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { UsersService } from 'src/users/users.service';
import { request } from 'http';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService, private usersService: UsersService){}

    @Get('profiles')
    async getProfiles(@Param('id') id: string, @Req() req: Request){
        console.log(request)
        return await this.usersService.find(null,Number(id))
    }
}
