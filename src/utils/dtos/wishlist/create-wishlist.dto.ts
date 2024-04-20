import { Profile } from "src/utils/entities";
import {IsOptional} from 'class-validator'

export class CreateWishlistDto{
    @IsOptional()
    profile: Profile
}