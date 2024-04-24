import { Controller} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SerializerInterceptor } from 'src/utils/interceptors/serialize.interceptor';
import { Post, Body, UseInterceptors } from '@nestjs/common';
import { ResponseUserDto } from 'src/utils/dtos/users/response-user.dto';
import { CreateUserDto } from 'src/utils/dtos/users/create-user.dto';
import { SignInUserDto } from 'src/utils/dtos/users/signin-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @UseInterceptors(new SerializerInterceptor(ResponseUserDto))
    @Post('sign-up')
    async createAccount(@Body() body: CreateUserDto){
        return this.authService.createAccount(body);
    }

    @Post('sign-in')
    async enterAccount(@Body() body: SignInUserDto){
        return this.authService.generateToken(body);
    }
}

    