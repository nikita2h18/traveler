import { NotFoundException } from "@nestjs/common";

export class UserException extends NotFoundException {
  constructor() {
    super(`No such user`);
  }
}