import { Body, Controller, Headers, Post } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileDto } from "../dto/ProfileDto";

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  @Post('create')
  createProfile(@Headers('token') token: string, @Body() profileDto: ProfileDto) {
    return this.profileService.createProfile(token, profileDto);
  }
}
