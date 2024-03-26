import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/utils/dtos/products/create-product.dto';

@Injectable()
export class ProductsService {


    constructor(@InjectRepository(Product) private repo: Repository<Product>){}

    async createProduct(product: CreateProductDto){
        const newProduct = this.repo.create(product)
        return await this.repo.save(newProduct);
    }

    async findProduct({price, name, category, description, quantity_on_inventory, brand}: Partial<Product>){
        const query = this.repo.createQueryBuilder("product")    
        name && query.orWhere("name = :name", {name})
        price && query.orWhere("price = :price",{price})
        quantity_on_inventory && query.orWhere("quantity_on_inventory = :quantity_on_inventory",{quantity_on_inventory})
        category && query.orWhere("category = :category",{category})
        description && query.orWhere("description = :description",{description})
        brand && query.orWhere("brand = :brand",{brand})
        return await query.getMany()
    }
}
