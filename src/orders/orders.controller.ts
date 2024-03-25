import { Controller, Get, Param, Body, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PlaceOrderDto } from 'src/utils/dtos/place-order.dto';
import { AuthGuard } from 'src/utils/guards/auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService){}

    /*@Get('/:id')
    getOrder(@Param('id') id: number){
        console.log(id)
    }*/

    @UseGuards(AuthGuard)
    @Post('/place-order')
    placeOrder(@Body() {products, cart}: PlaceOrderDto){
        console.log(products)
    }
}
