import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordingsModule } from './recordings/recordings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RecordingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
