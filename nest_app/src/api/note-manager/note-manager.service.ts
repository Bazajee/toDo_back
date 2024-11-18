import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { NoteOwnerService } from 'src/core/note-owner/note-owner.service'
import { NoteService } from 'src/core/note/note.service'
import { AuthService } from '../auth/auth.service'
import { TextBlockService } from 'src/core/text-block/text-block.service'


@Injectable()
export class NoteManagerService {
    constructor(
        private note: NoteService,
        private noteOwner : NoteOwnerService,
        private authService: AuthService,
        private textBlockService: TextBlockService

    ) {}

    // Create a new note and relative instance.
    async createNote (requestBody, request): Promise<Object> {
        const user = await this.authService.getUserFromCookie(request.cookies)
        const noteInstance = await this.note.createNoteInstance(requestBody)
        const noteOwnerInstance = await this.noteOwner.createNoteOwner({userId: user.id, NoteId: noteInstance.id})
        if (requestBody.noteContent.textData) {
            const newTextBlock = await this.textBlockService.createTextBlock(noteInstance.id, requestBody.noteContent.textData, 0 )
        } else if (requestBody.noteContent.listData) {
            // create list block instance 
        } else {
            // throw error here because DTO can't check key value
            throw new InternalServerErrorException('Note can be create without content.')
        }
        
        
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

    // ! Never delete instance in database, update isDeleted attribute
    async removeNote (noteId): Promise<Boolean> {
        const deletedNote = await this.note.deleteNote(noteId)
        const deletedNoteOwner = await this.noteOwner.deleteNoteOwnerFromNote(noteId)
        const deletedNoteContent = await this.textBlockService.deleteTextBlock(noteId)
        if (deletedNote.id == noteId) {
            return true
        }else{
            return false
        } 
    }

    // Return related content of a note. Front need final data for handle a good displaying
    async getNoteContent (noteId): Promise<Object> {
        noteId = parseInt(noteId, 10)
        const allTextBlock = await this.textBlockService.getAllTextBlock(noteId)
        return {
            "noteContent" : {
                "textBlock" : allTextBlock,
                // "listBlock": define allListBlock
            }
        }
    }

}
