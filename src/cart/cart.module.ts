import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Cart } from 'src/entities';

@Module({
  providers: [CartService],
  imports: [TypeOrmModule.forFeature([Cart])],
  exports: [CartService],
  controllers: [CartController]
})
export class CartModule {}
