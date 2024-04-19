import {Post,   Delete, Get, Put, Body, Param,Controller, NotFoundException, UseInterceptors, UseGuards} from '@nestjs/common'
import { SerializerInterceptor } from 'src/utils/interceptors/serialize.interceptor';
import { ResponseUserDto } from '../utils/dtos/users/response-user.dto';
import { UsersService } from './users.service';


@UseInterceptors(new SerializerInterceptor(ResponseUserDto))
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    getUsers(){
        return this.usersService.findAll();
    }

    @Get('/:id')
    getUser(@Param('id') id: string){
        return this.usersService.find(null, Number(id));
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string){
        const existingUser = await this.usersService.find(null, Number(id));
        if(!existingUser){
            throw new NotFoundException('User with given Id does not exists');
        }
        return await this.usersService.deleteUser(existingUser[0]);
    }

}
