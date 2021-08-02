import { Controller, Get, Headers } from "@nestjs/common";
import { NotificationGateway } from "./notification.gateway";

@Controller("notification")
export class NotificationController {
  constructor(private notificationGateway: NotificationGateway) {
  }

  @Get()
  getNotification(@Headers("token") token: string) {
    return this.notificationGateway.getNotification(token);
  }
}
