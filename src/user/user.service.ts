import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserException } from "./user.exception";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(token) {
    const userValidate = await this.jwtService.verifyAsync(token);
    if (!userValidate) {
      throw new UnauthorizedException();
    }

    return await this.findByLogin(userValidate.login)
  }

  async findByLogin(login: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        login
      }
    });

    if (!user) {
      throw new UserException();
    }

    return user;
  }
}
