import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './../entities/index';
import { CreateUserDto } from 'src/utils/dtos/users/create-user.dto';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
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

    generateToken(user: User){
        const data = {
            id:user.id,
            email: user.email
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
}
