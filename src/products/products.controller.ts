import { Controller, ConflictException } from '@nestjs/common';
import { ProductsService } from './products.service';
import {Body, Post, Get, Query} from '@nestjs/common'
import { CreateProductDto } from 'src/utils/dtos/products/create-product.dto';
import { FilterProduct } from 'src/utils/dtos/products/filter-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productService : ProductsService){}

    @Post()
    async createProduct(@Body() body: CreateProductDto){
        const products = await this.productService.findProduct({name: body.name})
        if(products.length>0){
           throw new ConflictException('Product already exists') 
        }
        return this.productService.createProduct(body);
    }

    @Get()
    getProducts(@Query() {price, name, category, quantity_on_inventory, brand}: FilterProduct){
        return this.productService.findProduct({price, name, category, quantity_on_inventory, brand})
    }
}
