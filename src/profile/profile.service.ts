import { Injectable } from "@nestjs/common";
import { ProfileDto } from "../dto/ProfileDto";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { User } from "../model/User";


@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService
  ) {
  }

  async createProfile(token: string, profileDto: ProfileDto) {
    const user = await this.userService.validateUser(token);

    return this.prismaService.user.update({
      where: { id: user.id },
      data: {
        profile: {
          create: {
            name: profileDto.name,
            lastname: profileDto.lastname,
            birthday: new Date(profileDto.birthday)
          }
        }
      }
    });
  }

  async getProfile(userId: number) {
    return this.prismaService.profile.findMany({
      where: {
        userId: userId
      }
    })
  }
}
