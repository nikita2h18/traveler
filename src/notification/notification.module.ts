import { Logger, Module } from "@nestjs/common";
import { NotificationGateway } from "./notification.gateway";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  providers: [
    NotificationGateway,
    Logger,
    PrismaService
  ],
  exports: [NotificationGateway, Logger, PrismaService]
})
export class NotificationModule {}
