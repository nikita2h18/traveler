import { Body, Controller, Get, Post, Headers, Param } from "@nestjs/common";
import { TravelService } from "./travel.service";
import { TravelDto } from "../dto/TravelDto";

@Controller('travel')
export class TravelController {
  constructor(private travelService: TravelService) {
  }

  @Get('view/:id')
  getTravel(@Param('id') id) {
    return this.travelService.getTravel(Number(id));
  }

  @Get('view')
  getAllTravel() {
    return this.travelService.getAllTravels();
  }

  @Get('user/:id')
  getAllUserTravels(@Param('id') id: string) {
    return this.travelService.getAllUserTravels(Number(id));
  }

  @Post('add')
  addTravel(@Headers('token') token: string, @Body() travelDto: TravelDto) {
    return this.travelService.addTravel(token, travelDto);
  }
}
