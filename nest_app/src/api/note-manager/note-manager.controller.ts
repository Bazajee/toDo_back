import { Controller, Get, Post, Body, Res, HttpStatus, Req, UseGuards, Query } from '@nestjs/common'
import { NoteManagerService } from './note-manager.service'
import { NoteDto } from './dto/note.dto'
import { AuthService } from '../auth/auth.service'
import { Response, Request } from 'express'
import { IsAuth } from '../auth/roles/isAuth.decorator'
import { RolesGuard } from '../auth/roles/roles.guard'
import { Roles } from '../auth/roles/roles.decorator'
import { AuthGuard } from '../auth/roles/isAuth.guard'




@Controller('api/note-manager')
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

    // This endpoint is call after every successfull auth in front and must return all related user data.
    @IsAuth()
    @Get('get-notes')
    async getAllNotes (
        @Req() request: Request,
    ){
        return await this.noteManagerService.getUserNotes(request)
    } 

    @IsAuth()
    @Get('delete-note')
    async removeNote (
        @Query('noteId') noteId: number, 
    ){
        return await this.noteManagerService.removeNote(noteId)
    } 

    @IsAuth()
    @Get('delete-text-block')
    async removeTextBlock (
        @Query('noteId') noteId: number, 
    ){
        return await this.noteManagerService.deleteTextBlock(noteId)
    } 

    @IsAuth()
    @Get('get-note-content')
    async getNoteContent(
        @Query('noteId') noteId: number, 
    ) {
        return await this.noteManagerService.getNoteContent(noteId)
    }

    @IsAuth()
    @Post('update-text')
    async updateTextContent(
        @Body() dto: NoteDto,
    ) {
        return await this.noteManagerService.updateBlockText(dto)
    }

    @IsAuth()
    @Post('create-content')
    async createTextContent(
        @Body() dto: NoteDto,
    ) {
        return await this.noteManagerService.createBlockText(dto)
    }
    
}
