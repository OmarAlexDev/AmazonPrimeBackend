import { Module, forwardRef } from '@nestjs/common';
import { Profile } from 'src/utils/entities';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistModule } from 'src/wishlist/wishlist.module';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [TypeOrmModule.forFeature([Profile])],
  exports: [ProfilesService]
})
export class ProfilesModule {}
