const bcrypt = require('bcrypt');
import {ConflictException} from '@nestjs/common';

const encrypt = async(value: string) =>{
    try{
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(value, salt)
        return hash;
    }
    catch(err){
        throw new ConflictException(err.message)
    }
}

const decrypt = async (value: string, valueToCompare: string) =>{
    try{
        return bcrypt.compare(value, valueToCompare)
    }
    catch(err){
        throw new ConflictException(err.message)
    }
}

export {encrypt,decrypt}
