import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './core/user/users.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { GroupModule } from './core/group/group.module';
import { NoteManagerModule } from './api/note-manager/note-manager.module';
import { AuthGuard } from './api/auth/roles/isAuth.guard';
import { RolesGuard } from './api/auth/roles/roles.guard';

@Module({
    imports: [UsersModule, PrismaModule, AuthModule, GroupModule, NoteManagerModule],
    controllers: [AppController],
    providers: [AppService],
    exports: [],
})

export class AppModule {}
