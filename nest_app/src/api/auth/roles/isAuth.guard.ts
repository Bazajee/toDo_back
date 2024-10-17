import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/core/user/users.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UsersService,
) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const jwtToken = request.cookies.jwt
    if (!jwtToken) {
        throw new UnauthorizedException('Auth cookie is not detected.')
    }
    const decodedCookie = this.jwtService.verify(jwtToken)
    const user = await this.userService.getUserByEmail(decodedCookie.email)
    if (user.id != decodedCookie.userId) {
      throw new UnauthorizedException('User authentification failed.')
    }
    return true 
  }
}