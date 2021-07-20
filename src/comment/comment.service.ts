import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CommentDto } from "../dto/CommentDto";
import { UserService } from "../user/user.service";
import { TravelService } from "../travel/travel.service";

@Injectable()
export class CommentService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private travelService: TravelService
  ) {
  }

  async getAll() {
    return this.prismaService.comment.findMany();
  }

  async write(token: string, comment: CommentDto) {
    const user = await this.userService.validateUser(token);

    return this.prismaService.travel.update({
      where: {id: Number(comment.travelId)},
      data: {
        comment: {
          create: {
            message: comment.message,
            userid: user.id
          }
        }
      }
    });
  }

  async getByTravel(travelId: number) {
    return this.prismaService.comment.findMany({
      where: {
        travelId
      }
    });
  }
}
