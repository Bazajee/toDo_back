import { Module } from '@nestjs/common'
import { NoteManagerController } from './note-manager.controller'
import { NoteManagerService } from './note-manager.service'
import { NoteModule } from 'src/core/note/note.module'
import { AuthModule } from '../auth/auth.module'
import { RolesGuard } from '../auth/roles/roles.guard'
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from '../auth/roles/isAuth.guard'


@Module({
  imports: [NoteModule, AuthModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '1h' },
    }),
  ], 
  controllers: [NoteManagerController],
  providers: [NoteManagerService, AuthGuard]
})
export class NoteManagerModule {}
