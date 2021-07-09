import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "../dto/UserDto";

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }
}