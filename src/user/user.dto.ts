export class UserDto {
  constructor(
    public id: number,
    public login: string,
    public password: string,
  ) {}
}
