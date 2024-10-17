import { Injectable } from '@nestjs/common';
import { NoteOwnerService } from 'src/core/note-owner/note-owner.service';
import { NoteService } from 'src/core/note/note.service';

@Injectable()
export class NoteManagerService {
    constructor(
        private note: NoteService,
        private noteOwner : NoteOwnerService,
    ) {}
    // create
    async createNote (requestData): Promise<String> {
        const noteInstance = await this.note.createNote(requestData)
        console.log(noteInstance)
        const noteOwnerInstance = await this.noteOwner.createNoteOwner()
        // create note-owner instance
        return 'createNote in note-manager service ? '
    }

    // init
    // update
    // delete

}
