import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "../dto/UserDto";
import { Response } from 'express'

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() userDto: UserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(userDto ,response);
  }
}