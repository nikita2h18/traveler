import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileDto } from "../dto/ProfileDto";
import { User } from "../model/User";

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  @Post('create')
  createProfile(@Headers('token') token: string, @Body() profileDto: ProfileDto) {
    return this.profileService.createProfile(token, profileDto);
  }

  @Get(':id')
  getProfile(@Param('id') userId: string) {
    return this.profileService.getProfile(Number(userId));
  }
}
