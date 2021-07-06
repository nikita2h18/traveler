import { NotFoundException } from "@nestjs/common";

export class AuthException extends NotFoundException {
  constructor() {
    super('Invalid user credentials');
  }
}