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
  private clients: { userId: number }[] = [];

  constructor(
    private logger: Logger,
    private prismaService: PrismaService
  ) {
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log(client.handshake.auth);
    this.clients.push(client.handshake.auth as { userId: number });
  }

  handleDisconnect(client: Socket) {
    console.log('disconnected');
    this.clients = this.clients.filter(c => c.userId !== client.handshake.auth.userId);
  }

  @SubscribeMessage("notify")
  async onNotify() {
    let subscribers = [];
    for (let client of this.clients) {
      subscribers.push(await this.prismaService.subscriber.findMany({
        where: {
          subscriberId: client.userId
        }
      }));
    }
    console.log(subscribers);
  }
}