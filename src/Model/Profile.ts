import { User } from "./User";

export class Profile {
  constructor(
    public name: string,
    public lastname: string,
    public birthday: Date,
    public user: User,
    public id?: number,
  ) {
  }
}