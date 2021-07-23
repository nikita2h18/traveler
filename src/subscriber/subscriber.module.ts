import { Module } from "@nestjs/common";
import { SubscriberService } from "./subscriber.service";
import { SubscriberController } from "./subscriber.controller";
import { UserModule } from "../user/user.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    UserModule,
    PrismaModule
  ],
  providers: [
    SubscriberService,
  ],
  controllers: [
    SubscriberController
  ],
  exports: [
    SubscriberService
  ]
})
export class SubscriberModule {
}
