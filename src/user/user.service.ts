import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserException } from "./user.exception";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(token) {
    const userValidate = await this.jwtService.verifyAsync(token);
    if (!userValidate) {
      throw new UnauthorizedException();
    }

    return await this.findByLogin(userValidate.login);
  }

  async findById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new UserException();
    }

    return user;
  }

  async findByTravel(id: number) {
    const travel = await this.prismaService.travel.findUnique({
      where: {
        id
      }
    });

    const user = this.findById(travel.userId);

    if (!user) {
      throw new UserException();
    }

    return user;
  }

  async findByLogin(login: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        login: login
      }
    });

    if (!user) {
      throw new UserException();
    }

    return user;
  }

  async findAllUnsubscribed(token: string) {
    const user = await this.validateUser(token);
    let users = await this.prismaService.user.findMany();
    const subscribes = [];

    const subscribers = await this.prismaService.subscriber.findMany({
      where: { subscriberId: user.id }
    });

    for (let subscriber of subscribers) {
      subscribes.push(await this.findById(subscriber.userId));
    }

    users = users.filter(u => u.id !== user.id);
    for (let subscribe of subscribes) {
      users = users.filter(u => u.id !== subscribe.id);
    }

    return users;
  }
}
