import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../dto/UserDto";
import { AuthException } from "./auth.exception";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {
  }

  async login(userDto: UserDto) {
    const user = await this.usersService.findByLogin(userDto.login);
    if (!await bcrypt.compare(userDto.password, user.password)) {
      throw new AuthException();
    }

    return { token: this.jwtService.sign({ login: user.login, sub: user.id }) };
  }
}
