import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { UserModule } from "../user/user.module";
import { TravelService } from "../travel/travel.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [CommentController],
  imports: [UserModule],
  providers: [
    CommentService,
    TravelService,
    PrismaService
  ]
})
export class CommentModule {}
