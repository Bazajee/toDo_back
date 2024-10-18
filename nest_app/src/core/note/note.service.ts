import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { PrismaService  } from '../prisma/prisma.service'
import { Prisma, Note } from '@prisma/client'
import { request } from 'http'
import { title } from 'process'

@Injectable()
export class NoteService {
    constructor(private prisma: PrismaService) {}
    
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

}
