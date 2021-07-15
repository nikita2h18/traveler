import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";

@Injectable()
export class LikeService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService
  ) {
  }

  async addLike(travelId: number, token: string) {
    const user = await this.userService.validateUser(token);
    return this.prismaService.travel.update({
      where: { id: travelId },
      data: { like: { create: { userId: user.id } } }
    });
  }
}
