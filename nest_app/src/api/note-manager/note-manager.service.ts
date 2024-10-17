import { Injectable } from '@nestjs/common';
import { NoteService } from 'src/core/note/note.service';

@Injectable()
export class NoteManagerService {
    constructor(private note: NoteService) {}
    // create
    async createNote (requestData): Promise<String> {
        // const noteInstance = this.note.createNote(requestData)
        // create note instance
        // create note-owner instance
        return 'toto'
    }
    // init
    // update
    // delete

}
