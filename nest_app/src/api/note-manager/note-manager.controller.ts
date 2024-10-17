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
        // console.log(request)
        // const user = this.auth.getAuthUser(request.cookies)
        console.log('in')
        return await this.noteManagerService.createNote(dto)
    }
}
