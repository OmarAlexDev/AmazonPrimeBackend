import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecordDTO } from 'src/utils/dtos/record/create-record.dto';
import { History, Record, Movie } from 'src/utils/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RecordService {
    constructor(@InjectRepository(Record) private repo: Repository<Record>){}

    async createRecord(record: Partial<CreateRecordDTO>){
        const newRecord = this.repo.create(record);
        return await this.repo.save(newRecord);
    }

    async deleteRecord(record: Partial<Record>){
        return await this.repo.delete(record);
    }

    async deleteRecords(records: Record []){
        return await this.repo.remove(records);
    }

    async updateRecord(record: Record, newRecord: Partial<Record>){
        return await this.repo.update(record, newRecord);
    }

    async find(record: Partial<Record>){
        return await this.repo.find({
            where: [
                {id: record.id}
            ],
            relations: {movie:true}
        })
    }

    async findMovieInHistory(history: Partial<History>, movie: Partial<Movie>){
        return await this.repo.find({
            where: [
                {movie: movie, id: history.id}
            ],
            relations: {movie:true}
        })
    }
}
