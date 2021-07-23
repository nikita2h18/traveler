import { Body, Controller, Delete, Get, Headers, Param, Post } from "@nestjs/common";
import { SubscriberService } from "./subscriber.service";

@Controller("subscriber")
export class SubscriberController {
  constructor(private subscriberService: SubscriberService) {
  }

  @Post()
  subscribe(@Headers("token") token: string, @Body() user: { userId: number }) {
    return this.subscriberService.subscribe(token, user.userId);
  }

  @Get("all/:id")
  getUserSubscribes(@Param("id") id: string) {
    return this.subscriberService.getUserSubscribes(Number(id));
  }

  @Delete(':id')
  unsubscribe(@Headers("token") token: string, @Param('id') userId: string) {
    return this.subscriberService.unsubscribe(token, Number(userId));
  }
}
