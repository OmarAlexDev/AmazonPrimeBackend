import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from '../entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { CartModule } from 'src/cart/cart.module';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User]), CartModule],
  providers: [
    UsersService,
    AuthService
  ],
  exports: [UsersService]
})
export class UsersModule {}
