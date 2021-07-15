import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";

@Module({
  controllers: [LikeController],
  imports: [UserModule],
  providers: [LikeService, PrismaService, UserService]
})
export class LikeModule {}
