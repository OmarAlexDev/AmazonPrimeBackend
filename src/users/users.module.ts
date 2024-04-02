import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from '../entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { WishlistModule } from 'src/wishlist/wishlist.module';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), WishlistModule],
  providers: [
    UsersService,
    AuthService
  ],
  exports: [UsersService]
})
export class UsersModule {}
