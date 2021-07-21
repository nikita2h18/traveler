import { Module } from "@nestjs/common";
import { SubscriberService } from "./subscriber.service";
import { SubscriberController } from "./subscriber.controller";
import { PrismaService } from "../prisma/prisma.service";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";

@Module({
  imports: [
    UserModule
  ],
  providers: [
    SubscriberService,
    PrismaService,
    UserService
  ],
  controllers: [SubscriberController],
  exports: [
    PrismaService,
    SubscriberService
  ]
})
export class SubscriberModule {
}
