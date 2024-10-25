import { Module } from '@nestjs/common';
import { NoteOwnerService } from './note-owner.service';

@Module({
  providers: [NoteOwnerService]
})
export class NoteOwnerModule {}
