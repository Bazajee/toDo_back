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

    // Create a new note and relative instance 
    async createNote (requestBody, request): Promise<Object> {
        const noteInstance = await this.note.createNoteInstance(requestBody)
        const user = await this.authService.getUserFromCookie(request.cookies)
        const noteOwnerInstance = await this.noteOwner.createNoteOwner({userId: user.id, NoteId: noteInstance.id})
        return {noteOwner: noteOwnerInstance, note: noteInstance}
    }

    // Get all note of auth user
    async getUserNotes (request): Promise<Object> {
        const user = await this.authService.getUserFromCookie(request.cookies)
        const notesOwned = await this.noteOwner.getNotesOwned({userId: user.id})
        const noteIds = notesOwned.map(note => note.noteId)
        const notes =  await this.note.getNotes(noteIds)
        return {notes}
    }

    // ! Never delete instance in database
    async removeNote (noteId): Promise<Boolean> {
        const deletedNote = await this.note.deleteNote(noteId)
        const deletedNoteOwner = await this.noteOwner.deleteNoteOwnerFromNote(noteId)
        if (deletedNote.id == noteId) {
            return true
        }else{
            return false
        } 
    }

    // update
    


}
