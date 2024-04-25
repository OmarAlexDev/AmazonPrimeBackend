
const jwt = require('jsonwebtoken');
import {ConflictException} from '@nestjs/common';

const generateToken = (data: Object) =>{
    return jwt.sign(data, process.env.SECRET,{expiresIn: '1h'}) 
}

const verifyToken = (token: string) =>{
    try{
        return jwt.verify(token, process.env.SECRET)
    }
    catch(err){
        throw new ConflictException(err.message)
    } 
}

export {generateToken,verifyToken}