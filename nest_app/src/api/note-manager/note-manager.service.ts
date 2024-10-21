import { Injectable } from '@nestjs/common';
import { NoteOwnerService } from 'src/core/note-owner/note-owner.service'
import { NoteService } from 'src/core/note/note.service'
import { AuthService } from '../auth/auth.service'


@Injectable()
export class NoteManagerService {
    constructor(
        private note: NoteService,
        private noteOwner : NoteOwnerService,
        private authService: AuthService
    ) {}
    // create
    async createNote (requestBody, request): Promise<Object> {
        const noteInstance = await this.note.createNoteInstance(requestBody)
        const user = await this.authService.getUserFromCookie(request.cookies)
        const noteOwnerInstance = await this.noteOwner.createNoteOwner({userId: user.id, NoteId: noteInstance.id})
        return {noteOwner: noteOwnerInstance, note: noteInstance}
    }

    // init
    async getUserNotes (request): Promise<Object> {
        const user = await this.authService.getUserFromCookie(request.cookies)
        const notesOwned = await this.noteOwner.getNotesOwned({userId: user.id})
        const noteIds = notesOwned.map(note => note.noteId)
        const notes =  await this.note.getNotes(noteIds)
        return {notes}
    }


    // update
    // delete

}