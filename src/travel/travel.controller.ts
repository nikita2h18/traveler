import { Body, Controller, Get, Post, Headers, Param } from "@nestjs/common";
import { TravelService } from "./travel.service";
import { TravelDto } from "../dto/TravelDto";

@Controller('travel/')
export class TravelController {
  constructor(private travelService: TravelService) {
  }

  @Get(':id')
  getTravel(@Param('id') id) {
    return this.travelService.getTravel(Number(id));
  }

  @Post('add')
  addTravel(@Headers('token') token: string, @Body() travelDto: TravelDto) {
    return this.travelService.addTravel(token, travelDto);
  }
}
