import { Profile } from "src/entities";
import {IsOptional} from 'class-validator'

export class CreateWishlistDto{
    @IsOptional()
    profile: Profile
}