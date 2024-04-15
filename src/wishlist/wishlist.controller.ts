import { Controller,Delete, Param } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
    constructor(private wishlistService: WishlistService){}
    
    @Delete('/:id')
    async deleteWishlist(@Param('id') id: string){
        return this.wishlistService.deleteWishlist({id:Number(id)})
    }
}
