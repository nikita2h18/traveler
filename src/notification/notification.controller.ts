import { Body, Controller, Get, Headers, Put } from "@nestjs/common";
import { NotificationGateway } from "./notification.gateway";

@Controller("notification")
export class NotificationController {
  constructor(private notificationGateway: NotificationGateway) {
  }

  @Get()
  getNotification(@Headers("token") token: string) {
    return this.notificationGateway.getNotification(token);
  }

  @Put()
  seen(@Headers("token") token: string, @Body() notifications) {
    return this.notificationGateway.seen(token, notifications);
  }
}
