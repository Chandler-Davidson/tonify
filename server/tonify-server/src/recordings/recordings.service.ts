import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recording } from './recording.entity';
import { Repository } from 'typeorm';
import { SaveRecordingDto } from './dto/save-recording-dto';

@Injectable()
export class RecordingsService {
  constructor(
    @InjectRepository(Recording)
    private recordingsRepository: Repository<Recording>,
  ) { }

  async getRecording(id: string): Promise<Recording> {
    try {
      const recording = await this.recordingsRepository.findOne(id);
      return recording;
    } catch (error) {
      return error.message;
    }
  }

  async storeRecording(recording: SaveRecordingDto): Promise<string> {
    const { id } = await this.recordingsRepository.save({
      notes: JSON.stringify(recording.notes)
    });
    return id;
  }
}
