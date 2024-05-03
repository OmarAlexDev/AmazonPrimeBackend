import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { History } from 'src/utils/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
  imports: [TypeOrmModule.forFeature([History])]
})
export class HistoryModule {}
