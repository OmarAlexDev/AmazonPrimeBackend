import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from '../utils/entities/index';
import { CreateUserDto } from 'src/utils/dtos/users/create-user.dto';
import { SignInUserDto } from 'src/utils/dtos/users/signin-user.dto';
import { UsersService } from 'src/users/users.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { WishlistService } from 'src/wishlist/wishlist.service';
import { decrypt} from 'src/utils/functions/bcrypt';
import { generateToken } from 'src/utils/functions/jwt';


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private profilesService: ProfilesService, private wishlistService: WishlistService){}

    async createAccount(body: CreateUserDto){
        const existingUser: User [] = await this.usersService.find(body.email,null);
        if(existingUser.length > 0){
            throw new ConflictException(`User with email ${body.email} already exists`)
        }
        const newUser =  await this.usersService.createUser(body)
        const newProfile = await this.profilesService.createProfile({username: newUser.firstName});
        await this.wishlistService.createWishlist({profile: newProfile});
        return await this.usersService.addProfileToUser(newUser, newProfile);
    }

    async getUserToken(body: SignInUserDto){
        const existingUser: User []  = await this.usersService.find(body.email,null);
        if(existingUser.length===0){
            throw new NotFoundException(`User with email ${body.email} not found`)
        }
        if(!await decrypt(body.password,existingUser[0].password)){
            throw new NotFoundException("Incorrect password")
        }
        const data = {
            id:existingUser[0].id,
            email: existingUser[0].email,
            isAdmin: existingUser[0].isAdmin
        }
        const token = generateToken(data)

        return {
            token: token
        }
    }
}
