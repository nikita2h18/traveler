import { Body, Controller, Get, Post, Headers} from "@nestjs/common";
import { TravelService } from "./travel.service";
import { TravelDto } from "../dto/TravelDto";

@Controller('travel')
export class TravelController {
  constructor(private travelService: TravelService) {
  }

  @Post('view')
  addTravel(@Headers('token') token: string, @Body() travelDto: TravelDto) {
    return this.travelService.addTravel(token, travelDto);
  }
}
