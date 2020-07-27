import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordingsController } from './recordings.controller';
import { Recording } from './recording.entity';
import { RecordingsService } from './recordings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recording])],
  providers: [RecordingsService],
  controllers: [RecordingsController]
})
export class RecordingsModule { }
