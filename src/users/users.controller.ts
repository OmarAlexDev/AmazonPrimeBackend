import {Post, Get, Put, Body, Controller, NotFoundException, UseInterceptors} from '@nestjs/common'
import { SerializerInterceptor } from 'src/utils/interceptors/serialize.interceptor';
import { ResponseUserDto } from '../utils/dtos/response-user.dto';
import { UsersService } from './users.service';


@UseInterceptors(new SerializerInterceptor(ResponseUserDto))
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    getUsers(){
        return this.usersService.findAll();
    }
}
