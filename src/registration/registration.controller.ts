import { Body, Controller, Post } from "@nestjs/common";
import { RegistrationService } from "./registration.service";
import { RegistrationUserDto } from "../dto/RegistrationUserDto";

@Controller('registration')
export default class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService
  ) {}

  @Post()
  async createPost(@Body() userDto: RegistrationUserDto) {
    return this.registrationService.registration(userDto);
  }
}