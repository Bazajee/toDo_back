import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService  } from '../prisma/prisma.service'
import { Prisma, Note } from '@prisma/client'
import { request } from 'http'
import { title } from 'process'

@Injectable()
export class NoteService {
    constructor(private prisma: PrismaService) {}
    
    async createNote (requestData?: {
        title?: string
    }) {
        if (Object.entries(requestData).length != 0) {
            if  (!requestData.title) {
                throw new BadRequestException('Arg format is invalid.')
            }
        }

        return await this.prisma.note.create({
            data: {
                title: requestData.title
            }
        })
    }

}
