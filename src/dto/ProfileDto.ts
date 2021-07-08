import { User } from "../Model/User";

export class ProfileDto {
  constructor(
    public name: string,
    public lastname: string,
    public birthday: Date,
    public user: User,
  ) {
  }
}