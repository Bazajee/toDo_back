import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, NoteOwner } from '@prisma/client'

@Injectable()
export class NoteOwnerService {
    constructor(private prisma: PrismaService) {}

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
}
