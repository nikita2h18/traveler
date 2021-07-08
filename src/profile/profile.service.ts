import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { ProfileDto } from "../dto/ProfileDto";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";


@Injectable()
export class ProfileService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private userService: UserService
  ) {
  }

  async createProfile(token: string, profileDto: ProfileDto) {
    const userValidate = await this.jwtService.verifyAsync(token);
    if (!userValidate) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findByLogin(userValidate.login);

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
}
