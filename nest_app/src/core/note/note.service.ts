import { Injectable } from '@nestjs/common'
import { PrismaService  } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { request } from 'http'

@Injectable()
export class NoteService {
    constructor(private prisma: PrismaService) {}

    async createNote (requestData?: {
        title?: string
    }) {
        console.log('data from request',requestData)
        return 'toto'
        // const newNote = await this.prisma.note.create{}
    }

}
