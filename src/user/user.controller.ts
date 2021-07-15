import { Controller, Get, Headers, Param } from "@nestjs/common";
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

  @Get("get")
  getUserByToken(@Headers('token') token: string) {
    return this.userService.validateUser(token);
  }
}
