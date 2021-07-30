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


@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  private clients: Socket[] = [];

  constructor(
    private logger: Logger,
    private prismaService: PrismaService
  ) {
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log("client: " + client.handshake.auth.userId);
    this.clients.push(client);
  }

  handleDisconnect(client: Socket) {
    this.clients = this.clients.filter(c => c.handshake.auth.userId !== client.handshake.auth.userId);
  }

  async onNotify(userId: number) {
    const subs = await this.prismaService.subscriber.findMany({
      where: {
        userId: userId
      }
    });

    console.log(subs);
    let listeners: Socket[];

    for (let sub of subs) {
      listeners = this.clients.filter(client => {
        return client.handshake.auth.userId === sub.subscriberId;
      });
    }

    for (let listener of listeners) {
      this.prismaService.user.update({
        where: { id: Number(listener.handshake.auth.userId) },
        data: { notification: { create: {} } }
      });
    }

    listeners.forEach(client => {
      client.emit("notify", { userId: userId });
    });
  }
}