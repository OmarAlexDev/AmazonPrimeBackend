import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishlistDto } from 'src/utils/dtos/wishlist/create-wishlist.dto';
import { History, Record } from 'src/utils/entities';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
    constructor(@InjectRepository(History) private repo: Repository<History>){}

    async createHistory(history: Partial<CreateWishlistDto>){
        const newHistory = this.repo.create(history);
        return await this.repo.save(newHistory);
    }

    async deleteHistory(history: Partial<History>){
        return await this.repo.delete(history);
    }

    async deleteHistories(histories: History []){
        return await this.repo.remove(histories);
    }

    async find(history: Partial<History>){
        return await this.repo.find({
            where: [
                {id: history.id}
            ],
            relations: {records:true}
        })
    }

    async addMovieToHistory(history : History, record : Record){
        history.records ? history.records.push(record) : history.records = [record];
        return this.repo.save(history);
    }
}
