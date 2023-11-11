import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthLoginDto {
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class AuthRegisterDto {
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}
