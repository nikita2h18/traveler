import { Body, Controller, Get, Headers, Param, Post, Put } from "@nestjs/common";
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

  @Put('edit')
  edit(@Headers('token') token: string, @Body() profileDto: ProfileDto) {
    return this.profileService.editProfile(token, profileDto);
  }

  @Get(':id')
  getProfile(@Param('id') userId: string) {
    return this.profileService.getProfile(Number(userId));
  }
}
