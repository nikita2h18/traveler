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
import { log } from "util";


@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  private clients: Socket[] = [];

  constructor(
    private logger: Logger,
    private prismaService: PrismaService
  ) {
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.clients.push(client);
  }

  handleDisconnect(client: Socket) {
    this.clients = this.clients.filter(c => c.handshake.auth.userId !== client.handshake.auth.userId);
  }

  @SubscribeMessage('notify')
  async onNotify(userId: number) {
    const subs = await this.prismaService.subscriber.findMany({
      where: {
        subscriberId: userId
      }
    });
    let clientsToNotify: Socket[];

    for (let sub of subs) {
      clientsToNotify = this.clients.filter(client => client.handshake.auth.userId === sub.userId)
    }

    clientsToNotify.forEach(client => client.emit('notify', "{userId: userId}"))
  }
}