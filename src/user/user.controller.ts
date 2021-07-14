import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService
  ) {
  }

  @Get("travel/:id")
  getUserByTravel(@Param() param) {
    return this.userService.findByTravel(Number(param.id));
  }
}
