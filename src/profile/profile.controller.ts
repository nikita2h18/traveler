import { Body, Controller, Post, Req } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileDto } from "../dto/ProfileDto";
import { Request } from "express";

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  @Post()
  createProfile(@Req() request: Request, @Body() profileDto: ProfileDto) {
    return this.profileService.createProfile(request, profileDto);
  }
}
