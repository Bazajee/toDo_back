import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { PrismaService  } from '../prisma/prisma.service'


@Injectable()
export class NoteService {
    constructor(
        private prisma: PrismaService,

    ) {}
    
    async createNoteInstance (requestData?: {
        title?: string
    }) {
        if (Object.entries(requestData).length != 0) {
            if  (!requestData.title) {
                throw new BadRequestException('Arg format is invalid.')
            }
        }
        try {
            return await this.prisma.note.create({
                data: {
                    title: requestData.title
                }
            })
        } catch {
            throw new InternalServerErrorException('Creation in database failed.')
        }
    }

    async getNotes ( notesId: number | number [] ) {
        try {
            const noteIdsArray = Array.isArray(notesId) ? notesId : [notesId];
            return await this.prisma.note.findMany({
                where : {
                    id : {
                        in : noteIdsArray
                },
                isDeleted: false
                },
                
            })
        }catch{
            throw new InternalServerErrorException('Note extraction from database failed.')
        }
        
    }

    async deleteNote (noteId: number) {
        try {
            
            return await this.prisma.note.update({
                where: {
                    id : noteId
                },
                data: {
                    isDeleted: true 
                }
            })
        } catch (error) {
            throw new InternalServerErrorException('Deleted in database failed.')
        }
    }

}
