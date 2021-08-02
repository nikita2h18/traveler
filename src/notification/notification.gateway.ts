import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";


@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  private clients: Socket[] = [];

  constructor(
    private logger: Logger,
    private prismaService: PrismaService,
    private userService: UserService
  ) {
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.clients.push(client);
  }

  handleDisconnect(client: Socket) {
    this.clients = this.clients.filter(c => c.handshake.auth.userId !== client.handshake.auth.userId);
  }

  async getNotification(token: string) {
    const user = await this.userService.validateUser(token);
    return this.prismaService.notification.findMany({
      where: {
        userId: user.id
      }
    });
  }

  async onNotify(userId: number) {
    const subs = await this.prismaService.subscriber.findMany({
      where: {
        userId: userId
      }
    });

    let listeners: Socket[];

    for (let sub of subs) {
      listeners = this.clients.filter(client => {
        return client.handshake.auth.userId === sub.subscriberId;
      });
    }

    for (let sub of subs) {
      await this.prismaService.user.update({
        where: { id: sub.subscriberId },
        data: {
          notification: {
            create: {
              subscribeId: userId
            }
          }
        }
      });
    }

    if (!!listeners) {
      listeners.forEach(client => {
        client.emit("notify", { userId: userId });
      });
    }
  }
}