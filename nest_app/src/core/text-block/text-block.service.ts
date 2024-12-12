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

    // Place is use to handle displaying order of an note content (textBlock and listBlock). 
    // Like an array first position is 0.
    createTextBlock ( 
        noteId: number,
        textData: string, 
        place?: number, 
        title?: string, 
        
    ) {
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

    async deleteTextBlock  (
        textBlockId: number
    ) {
        try{
            return await this.prisma.textBlock.update({
                where: {
                    id : textBlockId
                },
                data: {
                    isDeleted: true
                }
            })
            
        } catch {
            throw new InternalServerErrorException('Text content deletion failed.')
        }
    }

    async updateTextBlock  (
        textBlockId: number, 
        newText: string
    ) {
        try {
            return await this.prisma.textBlock.update({
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
    async getAllTextBlock  (
        noteId: number
    )  {
        try {
            const note = await this.noteService.getNotes(noteId)
            if (note.length <= 0) {
                throw new BadRequestException('Invalid data provided to the database query.')
            }
            return await this.prisma.textBlock.findMany({
                where: {
                    noteId : noteId,
                    isDeleted: false

                },
            })
        } catch  (error) {
            throw new InternalServerErrorException('Text content retrieval failed.')


        }
    }
}
