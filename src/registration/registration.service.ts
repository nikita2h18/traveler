import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegistrationUserDto } from '../dto/RegistrationUserDto';
import { RegistrationException } from './registration.exception';
import  * as bcrypt from 'bcrypt'

@Injectable()
export class RegistrationService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {
  }

  async registration(registrationUserDto: RegistrationUserDto) {
    const login = registrationUserDto.login;
    const user = await this.prismaService.user.findUnique({
      where: {
        login
      }
    });

    if (user) {
      throw new RegistrationException(user.login)
    }

    return this.prismaService.user.create({
      data: registrationUserDto
    });
  }
}