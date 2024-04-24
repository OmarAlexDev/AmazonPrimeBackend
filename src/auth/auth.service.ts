import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../utils/entities/index';
import { CreateUserDto } from 'src/utils/dtos/users/create-user.dto';
import { SignInUserDto } from 'src/utils/dtos/users/signin-user.dto';
import { UsersService } from 'src/users/users.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { WishlistService } from 'src/wishlist/wishlist.service';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private profilesService: ProfilesService, private wishlistService: WishlistService){}

    async createAccount(body: CreateUserDto){
        const existingUser: User [] = await this.usersService.find(body.email,null);
        if(existingUser.length > 0){
            throw new NotFoundException(`User with email ${body.email} already exists`)
        }
        body.password =  await this.encrypt(body);
        const newUser =  await this.usersService.createUser(body)
        const newProfile = await this.profilesService.createProfile({username: newUser.firstName});
        await this.wishlistService.createWishlist({profile: newProfile});
        return await this.usersService.addProfileToUser(newUser, newProfile);
    }

    async generateToken(body: SignInUserDto){
        const existingUser: User []  = await this.usersService.find(body.email,null);
        if(existingUser.length===0){
            throw new NotFoundException(`User with email ${body.email} not found`)
        }
        if(!this.decrypt(body.password,existingUser[0].password)){
            throw new NotFoundException("Incorrect password")
        }
        const token = this.buildToken(existingUser[0])

        return {
            token: token,
            id: existingUser[0].id,
            email: existingUser[0].email
        }
    }

    async encrypt(body: CreateUserDto){
        try{
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(body.password, salt)
            return hash;
        }
        catch(err){
            throw new NotFoundException(err.message)
        }
    }

    async decrypt(password, hash){
        try{
            return bcrypt.compare(password, hash)
        }
        catch(err){
            throw new NotFoundException(err.message)
        }
    }

    buildToken(user: User){
        const data = {
            id:user.id,
            email: user.email,
            isAdmin: user.isAdmin
        }
        return jwt.sign(data, process.env.SECRET,{expiresIn: '1h'}) 
    }

    verifyToken(token: string){
        try{
            return jwt.verify(token, process.env.SECRET)
        }
        catch(err){
            throw new NotFoundException(err.message)
        }
        
    }

    extractAdminLevel(token: string){
        const decoded_token = jwt.verify(token, process.env.SECRET);
        return decoded_token;
    }
}
