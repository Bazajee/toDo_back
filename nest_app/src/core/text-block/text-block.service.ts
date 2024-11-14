import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TextBlockService {
    constructor(
        private prisma: PrismaService,
    ) {}

    createTextBlock = ( 
        noteId: number, 
        place?: number, 
        title?: string, 
        textData?: string,
    ) => {
        return this.prisma.textBlock.create({
            data: {
                noteId: noteId,
                title: title, 
                placeNumber: place,
                text: textData,
            }
        })

    }
}
