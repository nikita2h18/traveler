import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaService } from "../prisma/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";
import { JwtStrategy } from "../auth/jwt.strategy";
import { UserController } from './user.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" }
    })
  ],
  providers: [
    UserService,
    PrismaService,
    JwtStrategy
  ],
  exports: [
    UserService,
    JwtModule
  ],
  controllers: [UserController]
})
export class UserModule {
}
