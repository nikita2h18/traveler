import { Injectable } from "@nestjs/common";
import { TravelDto } from "../dto/TravelDto";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TravelService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {
  }

  async addTravel(token: string, travelDto: TravelDto) {
    const user = await this.userService.validateUser(token);
    return this.prismaService.user.update({
      where: { id: user.id },
      data: {
        travel: {
          create: {
            description: travelDto.description,
            pointFrom: travelDto.pointFrom,
            pointTo: travelDto.pointTo
          }
        }
      }
    });
  }

  async getTravel(id: number) {
    return this.prismaService.travel.findUnique({
      where: { id }
    })
  }
}
