import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/utils/dtos/create-user.dto';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
    async encrypt(body: CreateUserDto){
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(body.password, salt)
        const hashedPassword = salt+"/:/"+hash;
        return hashedPassword;
    }

    async decrypt(password, hashedPassword){
        const [salt,hash] = hashedPassword.split('/:/');
        return bcrypt.compare(password, hash)
    }

    generateToken(user){
        return jwt.sign({data: user}, process.env.SECRET,{expiresIn: '1h'}) 
    }
}
