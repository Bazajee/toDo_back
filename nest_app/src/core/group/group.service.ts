import { Injectable, BadRequestException } from '@nestjs/common'
import { Prisma, UserGroup } from '@prisma/client'
// import { group } from 'console'
import { PrismaService } from 'src/core/prisma/prisma.service'

@Injectable()
export class GroupService {
    constructor(private prisma: PrismaService) {}

    getGroupById(id: number) {
        try {

            if (!id) {
                    return {id: null, group: null}
                }
                return this.prisma.userGroup.findUnique({
                    where: { id },
                })
            } catch (error) {
                console.log(error)
                throw new BadRequestException(`Retrieving failed.`)
            }
    }

    getAllGroup() {
        try {
            return this.prisma.userGroup.findMany({
                select: {
                    group: true, // Only select the 'group' field
                },
            }).then(groups => groups.map(group => group.group))
        } catch (error) {
            console.log(error)
            throw new BadRequestException(`Retrieving failed.`)
        }
    }
}
