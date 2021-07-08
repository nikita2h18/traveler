import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../dto/UserDto";
import { AuthException } from "./auth.exception";
import * as bcrypt from "bcrypt";
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {
  }

  async login(userDto: UserDto, response: Response) {
    const user = await this.usersService.findByLogin(userDto.login);
    if (!await bcrypt.compare(userDto.password, user.password) ) {
      throw new AuthException();
    }

    response.cookie('jwt', this.jwtService.sign( { login: user.login, sub: user.id }), {httpOnly: true})
    return {
      message: 'success'
    };
  }
}
