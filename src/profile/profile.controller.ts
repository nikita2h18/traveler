import { Body, Controller, Headers, Post, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileDto } from "../dto/ProfileDto";

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  @Post()
  createProfile(@Headers("token") token: string, @Body() profileDto: ProfileDto) {
    console.log(token);
  }
}
