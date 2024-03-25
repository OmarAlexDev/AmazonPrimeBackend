import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Product } from 'src/entities';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService]
})
export class ProductsModule {}
