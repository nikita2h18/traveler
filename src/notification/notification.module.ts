import { Logger, Module } from "@nestjs/common";
import { NotificationGateway } from "./notification.gateway";
import { PrismaService } from "../prisma/prisma.service";
import { UserModule } from "../user/user.module";
import { NotificationController } from './notification.controller';

@Module({
  imports: [ UserModule ],
  providers: [
    NotificationGateway,
    Logger,
    PrismaService
  ],
  exports: [
    NotificationGateway,
    Logger,
    PrismaService
  ],
  controllers: [NotificationController]
})
export class NotificationModule {}
