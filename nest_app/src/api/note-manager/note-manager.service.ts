import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { NoteOwnerService } from 'src/core/note-owner/note-owner.service'
import { NoteService } from 'src/core/note/note.service'
import { AuthService } from '../auth/auth.service'
import { TextBlockService } from 'src/core/text-block/text-block.service'
import { text } from 'stream/consumers'


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
        try {
            const user = await this.authService.getUserFromCookie(request.cookies)
            const noteInstance = await this.note.createNoteInstance(requestBody)
            const noteOwnerInstance = await this.noteOwner.createNoteOwner({userId: user.id, NoteId: noteInstance.id})
            // console.log(requestBody.noteContent)
            if (requestBody.noteContent) {
                if (requestBody.noteContent.textData )  {
                    const newTextBlock = await this.textBlockService.createTextBlock(noteInstance.id, requestBody.noteContent.textData, 0 )
                } else if (requestBody.noteContent.listData !== null)  {
                    // create list block instance 
                } 
            }
            return {noteOwner: noteOwnerInstance, note: noteInstance}        
        } catch (error){
            console.log(error)
            throw new InternalServerErrorException(`Note creation failed.`)
        }
            
    }

    // Get all note of auth user
    async getUserNotes (request): Promise<Object> {
        try {
            const user = await this.authService.getUserFromCookie(request.cookies)
            const notesOwned = await this.noteOwner.getNotesOwned({userId: user.id})
            const noteIds = notesOwned.map(note => note.noteId)
            const notes =  await this.note.getNotes(noteIds)
            return {notes}
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(`Note loading failed.`)
        }
    }

    // ! Never delete instance in database, update isDeleted attribute
    async removeNote (noteId): Promise<Boolean> {
        try {
            noteId = parseInt(noteId)    
            const deletedNote = await this.note.deleteNote(noteId)
            const deletedNoteOwner = await this.noteOwner.deleteNoteOwnerFromNote(noteId)
            if (deletedNote.id == noteId) {
                return true
            }else{
                return false
            } 
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(`Note deleting failed. `)
        }

    }

    // Must return the object that has been updated
    async deleteTextBlock (textBlockId) {
        try {
            textBlockId = parseInt(textBlockId)
            return await this.textBlockService.deleteTextBlock(textBlockId)
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(`Text update failed.`)
        }
    }



    // Return related content of a note. Front need final data for handle a good displaying
    async getNoteContent (noteId): Promise<Object> {
        try {
            noteId = parseInt(noteId, 10)
            const allTextBlock = await this.textBlockService.getAllTextBlock(noteId)
            return {
                "noteContent" : {
                    "textBlock" : allTextBlock,
                    // "listBlock": define allListBlock
                }
            }
        } catch(error) {
            console.log(error)
            throw new InternalServerErrorException(`Content loading failed.`)
        }

    }

    async updateBlockText (requestBody) {
        try {
            return await this.textBlockService.updateTextBlock(parseInt(requestBody.blockId), requestBody.noteContent.textData )
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Text update failed.')
        }
    }

    async createBlockText (requestBody) {
        try {
            if (requestBody.noteContent) {
                if (requestBody.noteContent.textData )  {
                    return await this.textBlockService.createTextBlock(parseInt(requestBody.noteId), requestBody.noteContent.textData, parseInt(requestBody.place))

                } else if (requestBody.noteContent.listData !== null)  {
                    // create list block instance 
                } 
            }
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Text creation failed.')
        }
    }
}
