import { Controller, ConflictException } from '@nestjs/common';
import { ProductsService } from './products.service';
import {Body, Post, Get, Query} from '@nestjs/common'
import { CreateProductDto } from 'src/utils/dtos/create-product.dto';
import { Product } from 'src/entities';

@Controller('products')
export class ProductsController {
    constructor(private productService : ProductsService){}

    @Post()
    async createProduct(@Body() body: CreateProductDto){
        if(await this.productService.findProduct({name: body.name})){
           throw new ConflictException('Product already exists') 
        }
        return this.productService.createProduct(body);
    }

    @Get()
    getProducts(@Query() {price, name, category}: Partial<Product>){
        return this.productService.findAll({price, name, category})
    }
}
