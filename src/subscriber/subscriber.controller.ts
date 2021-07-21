import { Body, Controller, Delete, Get, Headers, Param, Post } from "@nestjs/common";
import { SubscriberService } from "./subscriber.service";

@Controller('subscriber')
export class SubscriberController {
  constructor(private subscriberService: SubscriberService) {
  }

  @Post()
  subscribe(@Headers('token') token: string, @Body() userId: number) {
    return this.subscriberService.subscribe(token, userId);
  }

  @Get('all/:id')
  getUserSubscribers(@Param('id') id: string) {
    return this.subscriberService.getUserSubscribers(Number(id));
  }

  @Delete()
  unsubscribe(@Headers('token') token: string, @Body() userId: number) {
    return this.subscriberService.unsubscribe(token, userId);
  }
}
