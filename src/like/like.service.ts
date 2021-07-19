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

  async like(travelId: number, token: string) {
    const user = await this.userService.validateUser(token);
    const like = await this.prismaService.like.findFirst({
      where: {
        userId: user.id,
        travelId: travelId
      }
    })

    if (!like) {
      await this.addLike(travelId, user);
    } else {
      await this.deleteLike(like);
    }

    return this.allLikes();
  }

  async addLike(travelId: number, user) {
    return this.prismaService.travel.update({
      where: { id: travelId },
      data: { like: { create: { userId: user.id } } }
    });
  }

  async deleteLike(like) {
    return this.prismaService.like.delete({
      where: { id: like.id }
    })
  }

  async allLikes() {
    return this.prismaService.like.findMany();
  }

  async isLiked(travelId: number, token) {
    const user = await this.userService.validateUser(token);
    const like = await this.prismaService.like.findFirst({
      where: {
        travelId: travelId,
        userId: user.id
      }
    });

    return !!like;
  }
}
