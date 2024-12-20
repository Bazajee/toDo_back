import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/core/user/users.service';
import { JwtService } from '@nestjs/jwt';
import { GroupService } from 'src/core/group/group.service';



@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private JwtService: JwtService,
    private userService: UsersService,
    private groupService: GroupService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const allGroup = await this.groupService.getAllGroup()
    if (!roles) {
      return true
    }
    roles.forEach(role => {
      if ( !allGroup.includes(role) ) {
        throw new UnauthorizedException('Role setup for this function is not correctly')}
    })
    try {
      const request = context.switchToHttp().getRequest()
      const payload =  await this.JwtService.verify(request.cookies.jwt)
      const user =  await this.userService.getUserById(payload.userId)
      if (!user.groupId) {
        throw new UnauthorizedException('User is not in correct group.');
      }

      const userRole = await this.groupService.getGroupById(user.groupId)
      if (roles.includes(userRole.group)){
        return true
      }    
    }catch{
      throw new UnauthorizedException('The token is invalid')
    }

    // design table to give possibilie to an admin to create group, and activate and deactivate functionality for specific group
  }
}
