import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/utils/dtos/create-product.dto';

@Injectable()
export class ProductsService {


    constructor(@InjectRepository(Product) private repo: Repository<Product>){}

    async createProduct(product: CreateProductDto){
        const newProduct = this.repo.create(product)
        return await this.repo.save(newProduct);
    }
    
    async findProduct(params: Partial<Product>){
        return await this.repo.findOneBy(params);
    }

    findAll({price, name, category}: Partial<Product>){
        console.log(price,name,category)
        return this.repo.query(`SELECT * FROM PRODUCT ${price ?  `WHERE price=${price}` : ""}`)
    }
}
