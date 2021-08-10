import { BadRequestException, Injectable } from "@nestjs/common";
import { TravelDto } from "../dto/TravelDto";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationGateway } from "../notification/notification.gateway";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { log } from "util";

@Injectable()
export class TravelService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private notificationService: NotificationGateway,
    private cloudinary: CloudinaryService
  ) {
  }

  async addTravel(token: string, travelDto: TravelDto) {
    const user = await this.userService.validateUser(token);
    await this.notificationService.onNotify(user.id);
    return this.prismaService.user.update({
      where: { id: user.id },
      data: {
        travel: {
          create: {
            description: travelDto.description,
            pointFrom: travelDto.pointFrom,
            pointTo: travelDto.pointTo,
            image: travelDto.image
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

  async getAllTravels() {
    return this.prismaService.travel.findMany()
  }

  async getAllUserTravels(id: number) {
    return this.prismaService.travel.findMany({
      where: {
        userId: id
      }
    })
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    const image = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    return image.url
  }
}
