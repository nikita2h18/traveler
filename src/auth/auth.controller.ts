import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";
import { UserDto } from "../dto/UserDto";

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }
}