import { Body, Controller, Post } from "@nestjs/common";
import { RegistrationService } from "./registration.service";
import { RegistrationUserDto } from "../dto/RegistrationUserDto";
import * as bcrypt from "bcrypt";

@Controller('registration')
export default class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService
  ) {}

  @Post()
  async createPost(@Body() userDto: RegistrationUserDto) {
    userDto.password = await bcrypt.hash(userDto.password, 12);

    return this.registrationService.registration(userDto);
  }
}