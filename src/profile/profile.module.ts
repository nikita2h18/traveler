import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    UserModule,
  ],
  providers: [
    ProfileService,
    UserService,
    PrismaService,
    JwtService
  ],
  controllers: [ProfileController]
})
export class ProfileModule {}
