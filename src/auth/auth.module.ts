import { Module } from '@nestjs/common';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { UsersModule } from 'src/users/users.module';
import { WishlistModule } from 'src/wishlist/wishlist.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HistoryModule } from 'src/history/history.module';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [UsersModule, ProfilesModule, WishlistModule, HistoryModule],
  providers: [AuthService]
})
export class AuthModule {}
