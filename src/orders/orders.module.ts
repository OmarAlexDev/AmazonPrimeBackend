import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([Order]), AuthModule],
  providers: [OrdersService]
})
export class OrdersModule {}
