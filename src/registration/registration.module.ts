import { Module } from '@nestjs/common';
import { RegistrationService } from "./registration.service";
import RegistrationController from "./registration.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [RegistrationController],
  providers: [
    RegistrationService,
    RegistrationController,
    PrismaService,
  ],
  exports: [
    RegistrationController,
    RegistrationService,
    PrismaService,
  ]
})
export class RegistrationModule {}
