import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import AuthController from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
