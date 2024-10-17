import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteOwnerService {
    constructor(private prisma: PrismaService) {}

    async createNoteOwner (

    ) {
        return ''
    }
}
