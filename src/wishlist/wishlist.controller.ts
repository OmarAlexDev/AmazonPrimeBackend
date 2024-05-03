import { Controller, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AdminGuard } from 'src/utils/guards/admin.guard';

@UseGuards(AdminGuard)
@Controller('wishlist')
export class WishlistController {
    constructor(private wishlistService: WishlistService){}
}
