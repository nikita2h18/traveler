import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { jwtConstants } from "../auth/constants";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    ProfileService,
    PrismaService,
    UserService,
  ],
  controllers: [ProfileController]
})
export class ProfileModule {}
