import { Controller, Get, Post, Body, Res, HttpStatus, Req, UseGuards } from '@nestjs/common'
import { NoteManagerService } from './note-manager.service'
import { NoteDto } from './dto/note.dto'
import { AuthService } from '../auth/auth.service'
import { Response, Request } from 'express'
import { IsAuth } from '../auth/roles/isAuth.decorator'
import { RolesGuard } from '../auth/roles/roles.guard'
import { Roles } from '../auth/roles/roles.decorator'
import { AuthGuard } from '../auth/roles/isAuth.guard'




@Controller('note-manager')
@UseGuards(AuthGuard)
export class NoteManagerController {
    constructor (
        private noteManagerService: NoteManagerService,
        private authService: AuthService,
    ) {}

    @IsAuth()
    @Post('new-note')
    async newNote (
        @Body() dto: NoteDto,
        @Req() request: Request,
    ) {
        return await this.noteManagerService.createNote(dto, request)
    }

    @IsAuth()
    @Get('get-notes')
    async getAllNotes (
        @Req() request: Request,
    ){
        return await this.noteManagerService.getUserNotes(request)
    } 

    @IsAuth()
    @Post('delete-note')
    async removeNote (
        @Req() request: Request,
        @Body() dto: NoteDto,
    ){
        return await this.noteManagerService.removeNote(dto.noteId)
    } 
}
