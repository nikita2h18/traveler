import { Logger, Module } from "@nestjs/common";
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { UserModule } from "../user/user.module";
import { TravelService } from "../travel/travel.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationGateway } from "../notification/notification.gateway";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";

@Module({
  controllers: [CommentController],
  imports: [
    UserModule,
    CloudinaryModule
  ],
  providers: [
    CommentService,
    TravelService,
    PrismaService,
    NotificationGateway,
    Logger
  ]
})
export class CommentModule {}
