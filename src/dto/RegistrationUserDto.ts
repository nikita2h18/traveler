import { IsString, IsNotEmpty } from 'class-validator';

export class RegistrationUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}