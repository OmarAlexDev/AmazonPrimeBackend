import { Controller,Delete, Param, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AdminGuard } from 'src/utils/guards/admin.guard';

@UseGuards(AdminGuard)
@Controller('wishlist')
export class WishlistController {
    constructor(private wishlistService: WishlistService){}
    
    @Delete('/:id')
    async deleteWishlist(@Param('id') id: string){
        return this.wishlistService.deleteWishlist({id:Number(id)})
    }
}
