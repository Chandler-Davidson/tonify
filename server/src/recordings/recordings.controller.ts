import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { RecordingsService } from './recordings.service';
import { Recording } from './recording.entity';
import { SaveRecordingDto } from './dto/save-recording-dto';

@Controller('recordings')
export class RecordingsController {
  constructor(private readonly recordingsService: RecordingsService) { }

  @Get('/:id')
  getRecording(
    @Param('id') id: string,
  ): Promise<Recording> {
    return this.recordingsService.getRecording(id);
  }

  @Post()
  saveRecording(
    @Body() recording: SaveRecordingDto
  ): Promise<string> {
    return this.recordingsService.storeRecording(recording);
  }
}
