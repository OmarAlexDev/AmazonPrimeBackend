import { Delete, Get, Patch, Post, Param,Controller, NotFoundException, ConflictException, UseInterceptors, Body, UseGuards} from '@nestjs/common'
import { SerializerInterceptor } from 'src/utils/interceptors/serialize.interceptor';
import { ResponseUserDto } from '../utils/dtos/users/response-user.dto';
import { UsersService } from './users.service';
import { AdminGuard } from 'src/utils/guards/admin.guard';
import { AdminUpdateUserDto } from 'src/utils/dtos/users/admin-update-user.dto';
import { AdminCreateUserDto } from 'src/utils/dtos/users/create-user-admin.dto';

@UseGuards(AdminGuard)
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
        if(existingUser.length===0){
            throw new NotFoundException(`User with id ${id} does not exists`);
        }
        return await this.usersService.deleteUser(existingUser[0]);
    }

    @Post()
    async createUser(@Body() body: AdminCreateUserDto){
        const existingUser = await this.usersService.find(body.email, null);
        if(existingUser.length>0){
            throw new ConflictException(`User with email ${body.email} already exists`)
        }
        return this.usersService.createUser(body);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: AdminUpdateUserDto){
        const existingUser = await this.usersService.find(body.email, null);
        if(existingUser.length===0){
            throw new NotFoundException(`User with id ${id} does not exists`);
        }
        return this.usersService.updateUser(Number(id),body)
    }

}
