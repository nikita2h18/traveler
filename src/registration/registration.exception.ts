import { NotFoundException } from "@nestjs/common";

export class RegistrationException extends NotFoundException {
  constructor(login: string) {
    super(`User with login: ${login} already exist`);
  }
}