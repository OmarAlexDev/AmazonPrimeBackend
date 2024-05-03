import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { Record } from 'src/utils/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService],
  imports: [TypeOrmModule.forFeature([Record])]
})
export class RecordModule {}
