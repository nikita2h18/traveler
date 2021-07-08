import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { ProfileDto } from "../dto/ProfileDto";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "../Model/User";
import { UserService } from "../user/user.service";
import { Profile } from "../Model/Profile";
import { connect } from "tls";


@Injectable()
export class ProfileService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private userService: UserService
  ) {
  }

  async createProfile(request: Request, profileDto: ProfileDto) {
    const userValidate = await this.jwtService.verifyAsync(request.cookies["jwt"]);
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
