import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SubscriberService {
  constructor(
    private userService: UserService,
    private prismaService: PrismaService
  ) {
  }

  async subscribe(token: string, userId: number) {
    const subscriber = await this.userService.validateUser(token);
    const userToSubscribe = await this.userService.findById(userId);
    return this.prismaService.user.update({
      where: { id: userToSubscribe.id },
      data: {
        subscriber: {
          create: {
            subscriberId: subscriber.id
          }
        }
      }
    });
  }

  async unsubscribe(token: string, userId: number) {
    const user = await this.userService.validateUser(token);
    const subscriber = await this.prismaService.subscriber.findFirst({
      where: {
        subscriberId: user.id ,
        userId: userId
      }
    });
    return this.prismaService.subscriber.delete({
      where: {
        id: subscriber.id
      }
    });
  }

  async getUserSubscribers(userId: number) {
    return this.prismaService.subscriber.findMany({
      where: { id: userId }
    });
  }
}
