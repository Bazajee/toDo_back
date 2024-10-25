import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RolesGuard } from './roles/roles.guard';
import { AuthGuard } from './roles/isAuth.guard';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, AuthGuard, RolesGuard],
    controllers: [AuthController  ],
    exports: [AuthService, AuthGuard, RolesGuard]
})
export class AuthModule {}
