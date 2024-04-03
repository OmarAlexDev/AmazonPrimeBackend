import { Module } from '@nestjs/common';
import { Profile } from 'src/entities';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  imports: [TypeOrmModule.forFeature([Profile])],
  exports: [ProfilesService]
})
export class ProfilesModule {}
