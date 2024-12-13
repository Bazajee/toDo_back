import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { Prisma, NoteOwner } from '@prisma/client'

@Injectable()
export class NoteOwnerService {
    constructor(
        private prisma: PrismaService

    ) {}

    async createNoteOwner (requestData: {
        userId: number,
        NoteId: number
    }) {
        try {
            return await this.prisma.noteOwner.create({
                data: {
                    userId: requestData.userId,
                    noteId: requestData.NoteId
                }
            })
        }catch {
            throw new InternalServerErrorException('Creation in database failed.')
        }
        
    }

    async getNotesOwned (requestData: {userId?: number}) {
        try {
            
            return  await this.prisma.noteOwner.findMany({
                where: {
                    userId: requestData.userId, 
                    isDeleted: false
                }
            })
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Retrieves owned notes failed.')
        }
    }

    async deleteNoteOwnerFromNote (noteId: number) {
        try {
            
            const allNoteOwner = await this.prisma.noteOwner.findMany({
                where: {
                    noteId : noteId, 
                    isDeleted: false
                }
            })
            const allNoteOwnerIds = allNoteOwner.map(noteOwner => noteOwner.id)
            if (allNoteOwnerIds.length < 0 && Array.isArray(allNoteOwnerIds)) {
                throw new InternalServerErrorException('Retrieve data in database failed.')
            }
            return await this.prisma.noteOwner.updateMany({
                where: {
                    id: {in: allNoteOwnerIds}
                },
                data: {
                  isDeleted: true 
                }
            })
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Deleted in database failed.')
        }
    }

}
