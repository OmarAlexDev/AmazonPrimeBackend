import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UsersModule } from 'src/users/users.module';
import { MoviesModule } from 'src/movies/movies.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { WishlistModule } from 'src/wishlist/wishlist.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [UsersModule, MoviesModule, ProfilesModule, WishlistModule, AuthModule]
})
export class AccountModule {}
