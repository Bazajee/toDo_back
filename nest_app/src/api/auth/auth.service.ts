import { Injectable, BadRequestException, UnauthorizedException} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/core/user/users.service';
import { GroupService } from 'src/core/group/group.service';
import { constants } from 'buffer';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        // private prisma: PrismaService,
        private jwtService: JwtService,
        private GroupService: GroupService

    ) {}

    private async validatePassword(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            throw new BadRequestException(`${error}`)
        }
    }

    // Handle REST API authentification with a jwtToken
    async initSession(body: {
        email: string;
        password: string;
    }): Promise<object> {
        const user = await this.usersService.getUserByEmail(body.email);
        if (!user) {
            return { message: 'User not found.' };
        }
        const isPasswordValid =  await this.validatePassword(
            body.password,
            user.password,
        );
        if (!isPasswordValid) {
            return { message: 'Password is invalid.' };
        }
        const payload = { userId: user.id, email: user.email }
        const jwtToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
        });
        return { sessionToken: jwtToken }
    }

    async signUp(body: { email: string; username: string; password: string }) {
        try{
            const newUser = await this.usersService.createUser(body);
            return newUser
        } catch (error){
            throw new BadRequestException(`${error}`)
        }

    }

    // Handle front-end authentification with cookie and jwt-token
    async logIn(body: {
        email: string;
        password: string;
    }): Promise<{ message: string; token?: string, userData?: object  }> {
        try {
            const user = await this.usersService.getUserByEmail(body.email)
            if (!user) {
                return { message: 'This email is not register' }
            }

            const isPasswordValid =  await this.validatePassword(
                body.password,
                user.password,
            )

            if (!isPasswordValid) {
                return { message: 'Password is invalid' }
            }

            const jwtToken = await this.jwtService.signAsync(
                { email: user.email, username: user.name, userId: user.id },
                { expiresIn: '7h' },
            )
            return { message: 'login succeed', token: jwtToken, userData: { mail: user.email, username: user.name, userId: user.id, userGroup: await this.GroupService.getGroupById(user.groupId) } }
        }catch (error) {
            throw new BadRequestException(`${error}`)
        }
    }

    async getUserFromCookie(cookie) {
        const jwtToken = cookie.jwt
        if (!jwtToken) {
            throw new UnauthorizedException('Auth cookie is not detected.')
        }
        const decodedCookie = this.jwtService.verify(jwtToken)
        const user = await this.usersService.getUserByEmail(decodedCookie.email)
        if (user.id != decodedCookie.userId) {
        throw new UnauthorizedException('User authentification failed.')
        }
        return user
    }
}
