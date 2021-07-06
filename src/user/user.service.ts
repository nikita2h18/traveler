import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserException } from "./user.exception";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService
  ) {
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
