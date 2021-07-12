import { Module } from "@nestjs/common";
import { TravelController } from "./travel.controller";
import { TravelService } from "./travel.service";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma/prisma.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { jwtConstants } from "../auth/constants";

@Module({
  imports: [
    UserModule,
  ],
  controllers: [TravelController],
  providers: [
    TravelService,
    UserService,
    PrismaService,
  ]
})
export class TravelModule {
}
