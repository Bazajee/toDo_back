import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/core/user/users.service';
import { AuthService } from '../auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private usersService: UsersService,
        private authService: AuthService
) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const authUser = await this.authService.getUserFromCookie(request.cookies)
    if (!authUser) {
        return false 
    }
    return true 
  }
}