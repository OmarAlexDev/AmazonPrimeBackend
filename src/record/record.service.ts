import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecordDTO } from 'src/utils/dtos/record/create-record.dto';
import { Record } from 'src/utils/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RecordService {
    constructor(@InjectRepository(Record) private repo: Repository<Record>){}

    async createRecord(record: Partial<CreateRecordDTO>){
        console.log("Record to be created::: ",record)
        const newRecord = this.repo.create(record)
        console.log("Record created ::: ",newRecord)
        return await this.repo.save(newRecord);
    }

    async deleteRecord(record: Partial<Record>){
        return await this.repo.delete(record);
    }

    async deleteRecords(records: Record []){
        return await this.repo.remove(records);
    }

    async findRecord(record: Partial<Record>){
        return await this.repo.find({
            where: [
                {id: record.id}
            ],
            relations: {movie:true}
        })
    }
}
