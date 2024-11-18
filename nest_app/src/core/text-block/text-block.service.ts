import { Injectable , InternalServerErrorException, BadRequestException} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { NoteService } from '../note/note.service'

@Injectable()
export class TextBlockService {
    constructor(
        private prisma: PrismaService,
        private noteService : NoteService
    ) {}

    // Place is use to handle dispaling order of an note content (textBlock and listBlock). 
    // Like an array firstposition is 0.
    createTextBlock = ( 
        noteId: number,
        textData: string, 
        place?: number, 
        title?: string, 
        
    ) => {
        try { 
            return this.prisma.textBlock.create({
                data: {
                    noteId: noteId,
                    title: title, 
                    placeNumber: place,
                    text: textData,
                }
            })
        } catch {
            throw new InternalServerErrorException('Text content creation failed.')
            }   
    }

    deleteTextBlock = (
        noteId: number
    )=> {
        try{
            return this.prisma.textBlock.updateMany({
                where: {
                    noteId : noteId
                },
                data: {
                    isDeleted: true
                }
            })
        } catch {
            throw new InternalServerErrorException('Text content deletion failed.')
        }
    }

    updateTextBlock = (
        textBlockId: number, 
        newText: string
    ) => {
        try {
            return this.prisma.textBlock.update({
                where: {
                    id: textBlockId
                },
                data: {
                    text: newText
                }

            })
        } catch {
            throw new InternalServerErrorException('Text content update failed.')
        }
    }

    // Caution to not return deleted data.
    getAllTextBlock = async (
        noteId: number
    ) => {
        try {
            const note = await this.noteService.getNotes(noteId)
            if (note.length <= 0) {
                throw new BadRequestException('Invalid data provided to the database query.')
            }
            return await this.prisma.textBlock.findMany({
                where: {
                    noteId : noteId
                },
            })
        } catch  (error) {
            throw new InternalServerErrorException('Text content retrieval failed.')
        }
    }
}
