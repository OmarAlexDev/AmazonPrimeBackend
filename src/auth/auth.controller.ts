import { Controller, Body, NotFoundException} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/utils/dtos/users/create-user.dto';
import { AuthService } from './auth.service';
import { UseInterceptors } from '@nestjs/common';
import { SerializerInterceptor } from 'src/utils/interceptors/serialize.interceptor';
import { ResponseUserDto } from 'src/utils/dtos/users/response-user.dto';
import { SignInUserDto } from 'src/utils/dtos/users/signin-user.dto';
import { User } from './../entities/index';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService, private usersService: UsersService){}
    
    @Post("sign-in")
    async signIn(@Body() {email, password}: SignInUserDto){
        const existingUser: User []  = await this.usersService.find(email);
        if(!existingUser){
            throw new NotFoundException(`User with email ${email} not found`)
        }
        if(!this.authService.decrypt(password,existingUser[0].password)){
            throw new NotFoundException("Incorrect password")
        }
        const token = this.authService.generateToken(existingUser[0])

        return {
            token: token,
            id: existingUser[0].id,
            email: existingUser[0].email
        }
    }   

    @UseInterceptors(new SerializerInterceptor(ResponseUserDto))
    @Post("sign-up")
    async signUp(@Body() body: CreateUserDto){
        const existingUser: User [] = await this.usersService.find(body.email);
        if(existingUser.length > 0){
            throw new NotFoundException(`User with email ${body.email} already exists`)
        }
        body.password =  await this.authService.encrypt(body);
        return this.usersService.createUser(body)
    }

}

    