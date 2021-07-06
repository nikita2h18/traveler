import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../dto/UserDto";
import { AuthException } from "./auth.exception";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: UserDto) {
    const user = await this.usersService.findByLogin(userDto.login);
    if (user.password !== userDto.password) {
      throw new AuthException();
    }

    const payload = { login: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
